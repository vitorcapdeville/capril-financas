"use client";

import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

type Query = {
    page: number | null;
    search?: string;
};

export default function PaginationMUI(
    { selectedPage, pageCount, selectedSearch, pathname }: {
        selectedPage: number;
        pageCount: number;
        selectedSearch: string;
        pathname: string;
    },
) {
    return (
        <Pagination
            page={selectedPage}
            count={pageCount}
            renderItem={(item) => {
                const query: Query = {
                    page: item.page,
                };

                if (selectedSearch) {
                    query["search"] = selectedSearch as string;
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
}
