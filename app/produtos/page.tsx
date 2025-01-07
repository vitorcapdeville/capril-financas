"use client";

import { useEffect, useState } from "react";
import { buscarProdutos, Produto } from "@/app/lib/api";
import Link from "next/link";

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchProdutos = async () => {
            const results = await buscarProdutos(query);
            setProdutos(results);
        };
        fetchProdutos();
    }, [query]);

    return (
        <div>
            <h1>Produtos</h1>
            <input
                type="text"
                placeholder="Buscar produtos"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        <Link href={`/produtos/${produto.id}`}>{produto.nome}</Link>
                    </li>
                ))}
            </ul>
            <Link href="/produtos/novo">
                <button>Adicionar Produto</button>
            </Link>
        </div>
    );
}
