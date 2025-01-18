"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    buscarClientes,
    buscarProdutos,
    cadastrarVenda,
    Cliente,
    Produto,
} from "@/app/lib/api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

export default function NovaVenda() {
    const [dataVenda, setDataVenda] = useState("");
    const [dataPagamento, setDataPagamento] = useState("");
    const [clienteId, setClienteId] = useState("");
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [items, setItems] = useState([{
        produto_id: "",
        preco_unitario: "",
        quantidade: "",
    }]);
    const router = useRouter();

    useEffect(() => {
        const fetchClientes = async () => {
            const results = await buscarClientes("");
            setClientes(results);
        };
        fetchClientes();
    }, []);

    useEffect(() => {
        const fetchProdutos = async () => {
            const results = await buscarProdutos("");
            setProdutos(results);
        };
        fetchProdutos();
    }, []);

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
                    InputLabelProps={{ shrink: true }}
                    value={dataVenda}
                    onChange={(e) => setDataVenda(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="date"
                    label="Data do Pagamento"
                    InputLabelProps={{ shrink: true }}
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
                                    handleItemChange(
                                        index,
                                        "produto_id",
                                        value.id.toString(),
                                    );
                                } else {
                                    handleItemChange(index, "produto_id", "");
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
                                handleItemChange(
                                    index,
                                    "preco_unitario",
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
                                handleItemChange(
                                    index,
                                    "quantidade",
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
