"use client";

import { getToken } from "@/app/lib/actions";
import { buscarClientes } from "@/app/lib/api";
import ItemList from "@/app/ui/item-list";
import { useEffect, useState } from "react";
import { Cliente } from "../../lib/definitions";

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
                subProperties={[{
                    key: "email",
                    callback: (item: string) => item,
                }, { key: "categoria", callback: (item: string) => item }]}
                routeName="clientes"
            />
        </div>
    );
}
