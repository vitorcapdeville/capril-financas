"use client";

import { useEffect, useState } from "react";
import { buscarVendas } from "@/app/lib/api";
import { Venda } from "../../lib/definitions";
import ItemList from "@/app/ui/item-list";
import useDebounce from "@/app/hooks/useDebounce";

export default function Vendas() {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);
    const pageSize = 5;

    useEffect(() => {
        const fetchVendas = async () => {
            const results = await buscarVendas(debouncedQuery, page, pageSize);
            setVendas(results.data);
            setCount(results.count);
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
