"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarCliente } from "@/app/lib/api";

export default function NovoCliente() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [categoria, setCategoria] = useState("");
    const [endereco, setEndereco] = useState("");
    const router = useRouter();

    const handleAddCliente = async () => {
        await cadastrarCliente({ nome, email, categoria, endereco });
        router.push("/clientes");
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />
            <input
                type="text"
                placeholder="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
            />
            <button onClick={handleAddCliente}>Adicionar Cliente</button>
        </div>
    );
}
