"use client";

import { readClientes } from "@/app/client";
import useDebounce from "@/app/hooks/useDebounce";
import ItemList from "@/app/ui/item-list";
import { useEffect, useState } from "react";
import { Cliente } from "../../lib/definitions";

export default function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);
    const pageSize = 5;

    useEffect(() => {
        const fetchVendas = async () => {
            const { data } = await readClientes({
                query: {
                    query: debouncedQuery,
                    skip: (page - 1) * pageSize,
                    limit: pageSize,
                },
            });
            if (data) {
                setClientes(data.data);
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
                items={clientes}
                mainProperty="nome"
                subProperties={[{
                    key: "email",
                    callback: (item: string) => item,
                }, { key: "categoria", callback: (item: string) => item }]}
                routeName="clientes"
            />
        </div>
    );
}
