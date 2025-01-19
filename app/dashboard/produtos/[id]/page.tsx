"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { buscarProdutoPorId } from "@/app/lib/api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function ProdutoDetalhes() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [produto, setProduto] = useState<any>(null);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const produto = await buscarProdutoPorId(Number(id));
                setProduto(produto);
            } catch (error) {
                console.error(error);
            }
        };
        if (id) {
            fetchProduto();
        }
    }, [id]);

    if (!produto) {
        return <div>Carregando...</div>;
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Detalhes do Produto
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Nome"
                    value={produto.nome}
                    slotProps={{ input: { readOnly: true } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Peso (em gramas)"
                    value={produto.peso_em_gramas}
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
