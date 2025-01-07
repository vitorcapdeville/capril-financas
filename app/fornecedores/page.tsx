"use client";

import { useEffect, useState } from "react";
import { buscarFornecedores, cadastrarFornecedor } from "@/app/lib/api";

export default function Fornecedores() {
    const [fornecedores, setFornecedores] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [novoFornecedor, setNovoFornecedor] = useState("");

    useEffect(() => {
        const fetchFornecedores = async () => {
            const results = await buscarFornecedores(query);
            setFornecedores(results);
        };
        fetchFornecedores();
    }, [query]);

    const handleAddFornecedor = async () => {
        if (novoFornecedor) {
            await cadastrarFornecedor(novoFornecedor);
            setNovoFornecedor("");
            const results = await buscarFornecedores(query);
            setFornecedores(results);
        }
    };

    return (
        <div>
            <h1>Fornecedores</h1>
            <input
                type="text"
                placeholder="Buscar fornecedores"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul>
                {fornecedores.map((fornecedor, index) => (
                    <li key={index}>{fornecedor}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Novo fornecedor"
                value={novoFornecedor}
                onChange={(e) => setNovoFornecedor(e.target.value)}
            />
            <button onClick={handleAddFornecedor}>Adicionar Fornecedor</button>
        </div>
    );
}
