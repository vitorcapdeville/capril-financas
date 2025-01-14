"use client";

import { useEffect, useState } from "react";
import { buscarClientes, Cliente } from "@/app/lib/api";
import ItemList from "@/app/ui/item-list";

export default function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchClientes = async () => {
            const results = await buscarClientes(query);
            setClientes(results);
        };
        fetchClientes();
    }, [query]);

    return (
        <div>
            <ItemList
                setQueryFunction={setQuery}
                queryValue={query}
                items={clientes}
                mainProperty="nome"
                subProperties={[{key: "email", callback: (item: string) => item}, {key: "categoria", callback: (item: string) => item}]}
                routeName="clientes"
            />
        </div>
    );
}
