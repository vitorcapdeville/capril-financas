"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { buscarCompraPorId, buscarFornecedorPorId } from "@/app/lib/api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function CompraDetalhes() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [compra, setCompra] = useState<any>(null);
    const [fornecedorNome, setFornecedorNome] = useState<string>("");

    useEffect(() => {
        const fetchCompra = async () => {
            try {
                const compra = await buscarCompraPorId(Number(id));
                setCompra(compra);
                if (compra.fornecedor_id) {
                    const fornecedor = await buscarFornecedorPorId(compra.fornecedor_id);
                    setFornecedorNome(fornecedor.nome);
                }
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
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Detalhes da Compra
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Data da Compra"
                    value={compra.data_compra}
                    slotProps={{ input: { readOnly: true } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Valor"
                    value={compra.valor}
                    slotProps={{ input: { readOnly: true } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Categoria"
                    value={compra.categoria}
                    slotProps={{ input: { readOnly: true } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Fornecedor"
                    value={fornecedorNome}
                    slotProps={{ input: { readOnly: true } }}
                />
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
