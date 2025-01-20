"use client";

import { buscarFornecedores } from "@/app/lib/api";
import { Fornecedor } from "../../lib/definitions";
import ItemList from "@/app/ui/item-list";
import { useEffect, useState } from "react";
import useDebounce from "@/app/hooks/useDebounce";

export default function Fornecedores() {
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);
    const pageSize = 5;

    useEffect(() => {
        const fetchFornecedores = async () => {
            const results = await buscarFornecedores(debouncedQuery, page, pageSize);
            setFornecedores(results.data);
            setCount(results.count);
        };
        fetchFornecedores();
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
                items={fornecedores}
                mainProperty="nome"
                subProperties={[{
                    key: "id",
                    callback: (item: number) => item.toString(),
                }]}
                routeName="fornecedores"
            />
        </div>
    );
}
