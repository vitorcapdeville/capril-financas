"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { buscarCompraPorId } from "@/app/lib/api";

export default function CompraDetalhes() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [compra, setCompra] = useState<any>(null);

    useEffect(() => {
        const fetchCompra = async () => {
            try {
                const compra = await buscarCompraPorId(Number(id));
                setCompra(compra);
            } catch (error) {
                console.error(error);
            }
        };
        if (id) {
            fetchCompra();
        }
    }, [id]);

    if (!compra) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Detalhes da Compra</h1>
            <p>Data da Compra: {compra.data_compra}</p>
            <p>Valor: {compra.valor}</p>
            <p>Categoria: {compra.categoria}</p>
            <p>ID do Fornecedor: {compra.fornecedor_id}</p>
            <button onClick={() => router.back()}>Voltar</button>
        </div>
    );
}
