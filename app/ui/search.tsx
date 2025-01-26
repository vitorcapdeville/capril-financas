"use client";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const Search = (
    { search, routeName }: { search?: string; routeName: string },
) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialRender = useRef(true);
    const [text, setText] = useState(search || "");
    const [query] = useDebounce(text, 750);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        params.set("search", query);
        if (!query) {
            params.delete("search");
        }
        router.push(`${pathname}?${params.toString()}`);
    }, [query, pathname, router, searchParams]);

    return (
        <TextField
            value={text}
            placeholder={`Buscar ${routeName}...`}
            onChange={(e) => setText(e.target.value)}
            id="outlined-start-adornment"
            fullWidth
            margin="normal"
            slotProps={{
                input: {
                    startAdornment: <SearchIcon />,
                },
            }}
        />
    );
};

export default Search;
