"use client";

import { PaginationItem, Pagination as PaginationMUI } from "@mui/material";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Query = {
    page: number | null;
    search?: string;
};

const Pagination = (
    { count }: {
        count: number;
    },
) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const selectedPage = Number(searchParams.get("page")) || 1;

    return (
        <PaginationMUI
            page={selectedPage}
            count={count}
            renderItem={(item) => {
                const query: Query = {
                    page: item.page,
                };

                if (searchParams.get("search")) {
                    query["search"] = searchParams.get("search") as string;
                }

                return (
                    <PaginationItem
                        component={Link}
                        href={{
                            pathname: pathname,
                            query: query,
                        }}
                        {...item}
                    />
                );
            }}
        />
    );
};

export default Pagination;
