"use client";

import { Pagination as PaginationMUI } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = (
    { pageNumber, count }: {
        pageNumber: number;
        count: number;
    },
) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [page, setPage] = useState(pageNumber);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());

        router.push(`?${params.toString()}`);
    }, [page, router, searchParams]);

    return (
        <PaginationMUI
            count={count}
            page={page}
            onChange={(e, v) => setPage(v)}
        />
    );
};

export default Pagination;
