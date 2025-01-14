"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarFornecedor } from "@/app/lib/api";

export default function novoFornecedor() {
    const [nome, setNome] = useState("");
    const router = useRouter();

    const handleAddFornecedor = async () => {
        await cadastrarFornecedor(nome);
        router.push("/fornecedores");
    };

    return (
        <div>
            <h1>Novo Fornecedor</h1>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <button onClick={handleAddFornecedor}>Adicionar</button>
        </div>
    );
}
