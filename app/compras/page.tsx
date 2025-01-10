"use client";

import { useEffect, useState } from "react";
import { buscarCompras, Compra } from "@/app/lib/api";
import Link from "next/link";

export default function Compras() {
    const [compras, setCompras] = useState<Compra[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchCompras = async () => {
            const results = await buscarCompras();
            setCompras(results);
        };
        fetchCompras();
    }, []);

    return (
        <div>
            <h1>Compras</h1>
            <ul>
                {compras.map((compra) => (
                    <li key={compra.id}>
                        <Link href={`/compras/${compra.id}`}>
                            {compra.categoria}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link href="/compras/novo">
                <button>Adicionar Compra</button>
            </Link>
        </div>
    );
}
