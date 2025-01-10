"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarCompra } from "@/app/lib/api";

export default function NovaCompra() {
    const [dataCompra, setDataCompra] = useState("");
    const [valor, setValor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fornecedorId, setFornecedorId] = useState("");
    const router = useRouter();

    const handleAddCompra = async () => {
        await cadastrarCompra({
            data_compra: dataCompra,
            valor: Number(valor),
            categoria,
            fornecedor_id: Number(fornecedorId),
        });
        router.push("/compras");
    };

    return (
        <div>
            <h1>Nova Compra</h1>
            <input
                type="date"
                placeholder="Data da Compra"
                value={dataCompra}
                onChange={(e) => setDataCompra(e.target.value)}
            />
            <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
            />
            <input
                type="text"
                placeholder="Categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />
            <input
                type="number"
                placeholder="ID do Fornecedor"
                value={fornecedorId}
                onChange={(e) => setFornecedorId(e.target.value)}
            />
            <button onClick={handleAddCompra}>Adicionar Compra</button>
        </div>
    );
}
