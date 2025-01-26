"use client";

import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Search = (
    { routeName }: { routeName: string },
) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(searchParams.toString());

    const handleChange = useCallback(
        debounce((event: any) => {
            params.set("page", "1");
            params.set("search", event.target.value);
            if (!event.target.value) {
                params.delete("search");
            }
            router.push(`?${params.toString()}`);
        }, 300),
        [],
    );

    return (
        <TextField
            placeholder={`Buscar ${routeName}...`}
            onChange={handleChange}
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
