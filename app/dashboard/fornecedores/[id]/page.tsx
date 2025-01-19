"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarFornecedorPorId } from "@/app/lib/api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function FornecedorDetalhes() {
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
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Detalhes do Fornecedor
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Nome"
                    value={fornecedor.nome}
                    slotProps={{ input: { readOnly: true } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="ID"
                    value={fornecedor.id}
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
