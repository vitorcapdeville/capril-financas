"use client";

import { useEffect, useState } from "react";
import { buscarVendas, Venda } from "@/app/lib/api";
import Link from "next/link";

export default function Vendas() {
    const [vendas, setVendas] = useState<Venda[]>([]);

    useEffect(() => {
        const fetchVendas = async () => {
            const results = await buscarVendas();
            setVendas(results);
        };
        fetchVendas();
    }, []);

    return (
        <div>
            <h1>Vendas</h1>
            <ul>
                {vendas.map((venda) => (
                    <li key={venda.id}>
                        <Link href={`/vendas/${venda.id}`}>
                            {venda.data_venda}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link href="/vendas/novo">
                <button>Adicionar Venda</button>
            </Link>
        </div>
    );
}
