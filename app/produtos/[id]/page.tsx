"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { buscarProdutos } from "@/app/lib/api";

export default function ProdutoDetalhes() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [produto, setProduto] = useState<any>(null);

    useEffect(() => {
        const fetchProduto = async () => {
            const results = await buscarProdutos("");
            setProduto(results.filter((produto) => produto.id === Number(id))[0]);
        };
        if (id) {
            fetchProduto();
        }
    }, [id]);

    if (!produto) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Detalhes do Produto</h1>
            <p>Nome: {produto.nome}</p>
            <p>Peso: {produto.peso_em_gramas} gramas</p>
            <button onClick={() => router.back()}>Voltar</button>
        </div>
    );
}
