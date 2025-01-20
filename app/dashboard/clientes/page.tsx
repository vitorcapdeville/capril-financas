"use client";

import { buscarClientes } from "@/app/lib/api";
import ItemList from "@/app/ui/item-list";
import { useEffect, useState } from "react";
import { Cliente } from "../../lib/definitions";
import useDebounce from "@/app/hooks/useDebounce";

export default function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);
    const pageSize = 5;

    useEffect(() => {
        const fetchClientes = async () => {
            const results = await buscarClientes(debouncedQuery, page, pageSize);
            setClientes(results.data);
            setCount(results.count);
        };
        fetchClientes();
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
