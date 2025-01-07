"use client";

import { useEffect, useState } from "react";
import { buscarClientes, Cliente } from "@/app/lib/api";
import Link from "next/link";

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
            <h1>Clientes</h1>
            <input
                type="text"
                placeholder="Buscar clientes"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>
                        <Link href={`/clientes/${cliente.id}`}>{cliente.nome}</Link>
                    </li>
                ))}
            </ul>
            <Link href="/clientes/novo">
                <button>Adicionar Cliente</button>
            </Link>
        </div>
    );
}
