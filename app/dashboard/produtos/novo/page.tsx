"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarProduto } from "@/app/lib/api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function NovoProduto() {
    const [nome, setNome] = useState("");
    const [peso, setPeso] = useState("");
    const router = useRouter();

    const handleAddProduto = async () => {
        await cadastrarProduto({ nome, peso_em_gramas: Number(peso) });
        router.push("/produtos");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Novo Produto
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    fullWidth
                    margin="normal"
                    type="text"
                    label="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="number"
                    label="Peso (em gramas)"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddProduto}
                    sx={{ mt: 2 }}
                >
                    Adicionar Produto
                </Button>
            </Box>
        </Container>
    );
}
