"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { buscarClientePorId } from "@/app/lib/api";

export default function ClienteDetalhes() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [cliente, setCliente] = useState<any>(null);

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const cliente = await buscarClientePorId(Number(id));
                setCliente(cliente);
            } catch (error) {
                console.error(error);
            }
        };
        if (id) {
            fetchCliente();
        }
    }, [id]);

    if (!cliente) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Detalhes do Cliente</h1>
            <p>Nome: {cliente.nome}</p>
            <p>Email: {cliente.email}</p>
            <p>Categoria: {cliente.categoria}</p>
            <p>Endereço: {cliente.endereco}</p>
            <button onClick={() => router.back()}>Voltar</button>
        </div>
    );
}
