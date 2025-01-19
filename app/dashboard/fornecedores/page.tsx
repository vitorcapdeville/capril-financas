"use client";

import { buscarFornecedores } from "@/app/lib/api";
import { Fornecedor } from "../../lib/definitions";
import ItemList from "@/app/ui/item-list";
import { useEffect, useState } from "react";

export default function Fornecedores() {
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchFornecedores = async () => {
            const results = await buscarFornecedores(query);
            setFornecedores(results);
        };
        fetchFornecedores();
    }, [query]);

    return (
        <div>
            <ItemList
                setQueryFunction={setQuery}
                queryValue={query}
                items={fornecedores}
                mainProperty="nome"
                subProperties={[{
                    key: "id",
                    callback: (item: number) => item.toString(),
                }]}
                routeName="fornecedores"
            />
            {
                /* <h1>Fornecedores</h1>
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
            <button onClick={handleAddFornecedor}>Adicionar Fornecedor</button> */
            }
        </div>
    );
}
