"use client";

import { readFornecedores } from "@/app/client";
import useDebounce from "@/app/hooks/useDebounce";
import ItemList from "@/app/ui/item-list";
import { useEffect, useState } from "react";
import { Fornecedor } from "../../lib/definitions";

export default function Fornecedores() {
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);
    const pageSize = 5;

    useEffect(() => {
        const fetchVendas = async () => {
            const { data } = await readFornecedores({
                query: {
                    query: debouncedQuery,
                    skip: (page - 1) * pageSize,
                    limit: pageSize,
                },
            });
            if (data) {
                setFornecedores(data.data);
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
