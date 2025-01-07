"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarProduto } from "@/app/lib/api";

export default function NovoCliente() {
    const [nome, setNome] = useState("");
    const [peso, setPeso] = useState("");
    const router = useRouter();

    const handleAddProduto = async () => {
        await cadastrarProduto({ nome, peso_em_gramas: Number(peso) });
        router.push("/produtos");
    };

    return (
        <div>
            <h1>Novo Cliente</h1>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
            />
            <button onClick={handleAddProduto}>Adicionar Produto</button>
        </div>
    );
}
