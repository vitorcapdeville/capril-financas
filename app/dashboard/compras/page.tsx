"use client";

import { buscarCompras } from "@/app/lib/api";
import ItemList from "@/app/ui/item-list";
import { useEffect, useState } from "react";
import { Compra } from "../../lib/definitions";
import useDebounce from "@/app/hooks/useDebounce";

export default function Compras() {
    const [compras, setCompras] = useState<Compra[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);
    const pageSize = 5;

    useEffect(() => {
        const fetchCompras = async () => {
            const results = await buscarCompras(debouncedQuery, page, pageSize);
            setCompras(results.data);
            setCount(results.count);
        };
        fetchCompras();
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
                items={compras}
                mainProperty="categoria"
                subProperties={[{
                    key: "data_compra",
                    callback: (item: string) =>
                        new Date(item).toLocaleDateString("pt-BR"),
                }, {
                    key: "valor",
                    callback: (item: number) => `R$ ${item.toFixed(2)}`,
                }]}
                routeName="compras"
            />
        </div>
    );
}
