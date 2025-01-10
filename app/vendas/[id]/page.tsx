"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { buscarVendaPorId } from "@/app/lib/api";

export default function VendaDetalhes() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [venda, setVenda] = useState<any>(null);

    useEffect(() => {
        const fetchVenda = async () => {
            try {
                const venda = await buscarVendaPorId(Number(id));
                setVenda(venda);
            } catch (error) {
                console.error(error);
            }
        };
        if (id) {
            fetchVenda();
        }
    }, [id]);

    if (!venda) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Detalhes da Venda</h1>
            <p>Data da Venda: {venda.data_venda}</p>
            <p>Data do Pagamento: {venda.data_pagamento}</p>
            <p>ID do Cliente: {venda.cliente_id}</p>
            <h2>Itens</h2>
            <ul>
                {venda.items.map((item: any, index: number) => (
                    <li key={index}>
                        <p>ID do Produto: {item.produto_id}</p>
                        <p>Preço Unitário: {item.preco_unitario}</p>
                        <p>Quantidade: {item.quantidade}</p>
                    </li>
                ))}
            </ul>
            <button onClick={() => router.back()}>Voltar</button>
        </div>
    );
}
