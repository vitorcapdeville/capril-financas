"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    buscarClientePorId,
    buscarProdutoPorId,
    buscarVendaPorId,
} from "@/app/lib/api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function VendaDetalhes() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [venda, setVenda] = useState<any>(null);
    const [clienteNome, setClienteNome] = useState<string>("");
    const [produtos, setProdutos] = useState<any[]>([]);

    useEffect(() => {
        const fetchVenda = async () => {
            try {
                const venda = await buscarVendaPorId(Number(id));
                setVenda(venda);
                if (venda.cliente_id) {
                    const cliente = await buscarClientePorId(venda.cliente_id);
                    setClienteNome(cliente.nome);
                }
                const produtos = await Promise.all(
                    venda.items.map(async (item: any) => {
                        let produto = { nome: "", peso_em_gramas: 0 };
                        if (item.produto_id) {
                            produto = await buscarProdutoPorId(
                                item.produto_id,
                            );
                        }
                        return {
                            ...item,
                            produto_nome: produto.nome,
                            produto_peso: produto.peso_em_gramas,
                        };
                    }),
                );
                setProdutos(produtos);
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
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Detalhes da Venda
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Data da Venda"
                    value={venda.data_venda}
                    slotProps={{ input: { readOnly: true } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Data do Pagamento"
                    value={venda.data_pagamento}
                    slotProps={{ input: { readOnly: true } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Cliente"
                    value={clienteNome}
                    slotProps={{ input: { readOnly: true } }}
                />
            </Box>
            <Typography variant="h6" component="h2" gutterBottom>
                Itens
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
                {produtos.map((item: any, index: number) => (
                    <Box component="li" key={index} sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Produto"
                            value={`${item.produto_nome} - ${item.produto_peso}g`}
                            slotProps={{ input: { readOnly: true } }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Preço Unitário"
                            value={item.preco_unitario}
                            slotProps={{ input: { readOnly: true } }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Quantidade"
                            value={item.quantidade}
                            slotProps={{ input: { readOnly: true } }}
                        />
                    </Box>
                ))}
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => router.back()}
                sx={{ mt: 2 }}
            >
                Voltar
            </Button>
        </Container>
    );
}
