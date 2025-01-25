"use client";

import { Pagination as PaginationMUI } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Pagination = (
    { pageNumber, count }: {
        pageNumber: number;
        count: number;
    },
) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialRender = useRef(true);

    const [page, setPage] = useState(pageNumber);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());

        router.push(`${pathname}?${params.toString()}`);
    }, [page, pathname, router, searchParams]);

    return (
        <PaginationMUI
            count={count}
            page={page}
            onChange={(e, v) => setPage(v)}
        />
    );
};

export default Pagination;
