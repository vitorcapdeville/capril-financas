"use client";

import { Pagination as PaginationMUI } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = (
    { count }: {
        count: number;
    },
) => {
    const searchParams = useSearchParams();
    const selectedPage = Number(searchParams.get("page")) || 1;
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", value.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <PaginationMUI
            count={count}
            page={selectedPage}
            onChange={handleChange}
        />
    );
};

export default Pagination;
