"use client";

import type { VendaPublic } from "@/app/client";
import { readVendas } from "@/app/client";
import useDebounce from "@/app/hooks/useDebounce";
import ItemList from "@/app/ui/item-list";
import { useEffect, useState } from "react";

export default function Vendas() {
    const [vendas, setVendas] = useState<VendaPublic[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);
    const pageSize = 5;

    useEffect(() => {
        const fetchVendas = async () => {
            const { data, error } = await readVendas({
                query: {
                    query: debouncedQuery,
                    skip: (page - 1) * pageSize,
                    limit: pageSize,
                },
            });
            if (data) {
                setVendas(data.data);
                setCount(data.count);
            }
        };
        fetchVendas();
    }, [page, debouncedQuery]);

    return (
        <div>
            <ItemList
                setQueryFunction={setQuery}
                queryValue={query}
                pageValue={page}
                setPageFunction={setPage}
                countValue={count}
                pageSize={pageSize}
                items={vendas}
                mainProperty="id"
                subProperties={[{
                    key: "data_venda",
                    callback: (item: string) =>
                        new Date(item).toLocaleDateString("pt-BR"),
                }]}
                routeName="vendas"
            />
        </div>
    );
}
