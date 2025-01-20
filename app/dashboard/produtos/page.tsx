"use client";

import { useEffect, useState } from "react";
import { buscarProdutos } from "@/app/lib/api";
import { Produto } from "../../lib/definitions";
import ItemList from "@/app/ui/item-list";
import useDebounce from "@/app/hooks/useDebounce";

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);
    const pageSize = 5;

    useEffect(() => {
        const fetchProdutos = async () => {
            const results = await buscarProdutos(debouncedQuery, page, pageSize);
            setProdutos(results.data);
            setCount(results.count);
        };
        fetchProdutos();
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
