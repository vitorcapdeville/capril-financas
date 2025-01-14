"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarFornecedorPorId } from "@/app/lib/api";

export default function ProdutoDetalhes() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [fornecedor, setFornecedor] = useState<any>(null);

    useEffect(() => {
        const fetchFornecedor = async () => {
            try {
                const fornecedor = await buscarFornecedorPorId(Number(id));
                setFornecedor(fornecedor);
            } catch (error) {
                console.error(error);
            }
        };
        if (id) {
            fetchFornecedor();
        }
    }, [id]);

    if (!fornecedor) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Detalhes do fornecedor</h1>
            <p>Nome: {fornecedor.nome}</p>
            <p>Id: {fornecedor.id}</p>
            <button onClick={() => router.back()}>Voltar</button>
        </div>
    );
}
