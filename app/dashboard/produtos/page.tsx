"use client";

import { readProdutos } from "@/app/client";
import useDebounce from "@/app/hooks/useDebounce";
import ItemList from "@/app/ui/item-list";
import { useEffect, useState } from "react";
import { Produto } from "../../lib/definitions";

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);
    const pageSize = 5;

    useEffect(() => {
        const fetchVendas = async () => {
            const { data, error } = await readProdutos({
                query: {
                    query: debouncedQuery,
                    skip: (page - 1) * pageSize,
                    limit: pageSize,
                },
            });
            if (data) {
                setProdutos(data.data);
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
                items={produtos}
                mainProperty="nome"
                subProperties={[{
                    key: "peso_em_gramas",
                    callback: (item: string) => item + "g",
                }]}
                routeName="produtos"
            />
        </div>
    );
}
