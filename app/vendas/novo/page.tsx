"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarVenda } from "@/app/lib/api";

export default function NovaVenda() {
    const [dataVenda, setDataVenda] = useState("");
    const [dataPagamento, setDataPagamento] = useState("");
    const [clienteId, setClienteId] = useState("");
    const [items, setItems] = useState([{
        produto_id: "",
        preco_unitario: "",
        quantidade: "",
    }]);
    const router = useRouter();

    const handleAddItem = () => {
        setItems([...items, {
            produto_id: "",
            preco_unitario: "",
            quantidade: "",
        }]);
    };

    const handleRemoveItem = (index: number) => {
        if (items.length > 1) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        }
    };

    const handleItemChange = (index: number, field: string, value: string) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleAddVenda = async () => {
        const vendaItems = items.map((item) => ({
            produto_id: Number(item.produto_id),
            preco_unitario: Number(item.preco_unitario),
            quantidade: Number(item.quantidade),
        }));
        await cadastrarVenda({
            data_venda: dataVenda,
            data_pagamento: dataPagamento || undefined,
            cliente_id: Number(clienteId),
        }, vendaItems);
        router.push("/vendas");
    };

    return (
        <div>
            <h1>Nova Venda</h1>
            <input
                type="date"
                placeholder="Data da Venda"
                value={dataVenda}
                onChange={(e) => setDataVenda(e.target.value)}
            />
            <input
                type="date"
                placeholder="Data do Pagamento"
                value={dataPagamento}
                onChange={(e) => setDataPagamento(e.target.value)}
            />
            <input
                type="number"
                placeholder="ID do Cliente"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
            />
            <h2>Itens</h2>
            {items.map((item, index) => (
                <div key={index}>
                    <input
                        type="number"
                        placeholder="ID do Produto"
                        value={item.produto_id}
                        onChange={(e) =>
                            handleItemChange(
                                index,
                                "produto_id",
                                e.target.value,
                            )}
                    />
                    <input
                        type="number"
                        placeholder="Preço Unitário"
                        value={item.preco_unitario}
                        onChange={(e) =>
                            handleItemChange(
                                index,
                                "preco_unitario",
                                e.target.value,
                            )}
                    />
                    <input
                        type="number"
                        placeholder="Quantidade"
                        value={item.quantidade}
                        onChange={(e) =>
                            handleItemChange(
                                index,
                                "quantidade",
                                e.target.value,
                            )}
                    />
                    {items.length > 1 && (
                        <button onClick={() => handleRemoveItem(index)}>Remover Item</button>
                    )}
                </div>
            ))}
            <button onClick={handleAddItem}>Adicionar Item</button>
            <button onClick={handleAddVenda}>Adicionar Venda</button>
        </div>
    );
}
