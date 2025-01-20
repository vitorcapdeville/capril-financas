"use client";

import { buscarClientes, buscarProdutos, cadastrarVenda } from "@/app/lib/api";
import { Cliente, Item, Produto } from "@/app/lib/definitions";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NovaVenda() {
    const [dataVenda, setDataVenda] = useState("");
    const [dataPagamento, setDataPagamento] = useState("");
    const [clienteId, setClienteId] = useState("");
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [items, setItems] = useState<Item[]>([{
        produto_id: 0,
        preco_unitario: 0,
        quantidade: 0,
    }]);
    const router = useRouter();

    useEffect(() => {
        const fetchClientes = async () => {
            const results = await buscarClientes("", 1, 100);
            setClientes(results.data);
        };
        fetchClientes();
    }, []);

    useEffect(() => {
        const fetchProdutos = async () => {
            const results = await buscarProdutos("", 1, 100);
            setProdutos(results.data);
        };
        fetchProdutos();
    }, []);

    const handleAddItem = () => {
        setItems([...items, {
            produto_id: 0,
            preco_unitario: 0,
            quantidade: 0,
        }]);
    };

    const handleRemoveItem = (index: number) => {
        if (items.length > 1) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        }
    };

    const handleProdutoIdChange = async (index: number, value: string) => {
        const newItems = [...items];
        newItems[index].produto_id = Number(value);
        setItems(newItems);
    };

    const handlePrecoUnitarioChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index].preco_unitario = Number(value);
        setItems(newItems);
    };

    const handleQuantidadeChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index].quantidade = Number(value);
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
        router.push("/dashboard/vendas");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Nova Venda
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    fullWidth
                    margin="normal"
                    type="date"
                    label="Data da Venda"
                    slotProps={{ inputLabel: { shrink: true } }}
                    value={dataVenda}
                    onChange={(e) => setDataVenda(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="date"
                    label="Data do Pagamento"
                    slotProps={{ inputLabel: { shrink: true } }}
                    value={dataPagamento}
                    onChange={(e) => setDataPagamento(e.target.value)}
                />
                <Autocomplete
                    disablePortal
                    options={clientes}
                    getOptionLabel={(option: Cliente) => option.nome}
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Cliente"
                            required
                        />
                    )}
                    onChange={(_, value) => {
                        if (value) {
                            setClienteId(value.id.toString());
                        } else {
                            setClienteId("");
                        }
                    }}
                />
                <Typography variant="h6" component="h2" gutterBottom>
                    Itens
                </Typography>
                {items.map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Autocomplete
                            disablePortal
                            options={produtos}
                            getOptionLabel={(option: Produto) =>
                                `${option.nome} - ${option.peso_em_gramas}g`}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Produto"
                                    required
                                />
                            )}
                            onChange={(_, value) => {
                                if (value) {
                                    handleProdutoIdChange(
                                        index,
                                        value.id.toString(),
                                    );
                                } else {
                                    handleProdutoIdChange(index, "0");
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            type="number"
                            label="Preço Unitário"
                            value={item.preco_unitario}
                            onChange={(e) =>
                                handlePrecoUnitarioChange(
                                    index,
                                    e.target.value,
                                )}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            type="number"
                            label="Quantidade"
                            value={item.quantidade}
                            onChange={(e) =>
                                handleQuantidadeChange(
                                    index,
                                    e.target.value,
                                )}
                        />
                        {items.length > 1 && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRemoveItem(index)}
                                sx={{ mt: 1 }}
                            >
                                Remover Item
                            </Button>
                        )}
                    </Box>
                ))}
                <Button
                    variant="outlined"
                    onClick={handleAddItem}
                    sx={{ mt: 2 }}
                >
                    Adicionar Item
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddVenda}
                    sx={{ mt: 2 }}
                >
                    Adicionar Venda
                </Button>
            </Box>
        </Container>
    );
}
