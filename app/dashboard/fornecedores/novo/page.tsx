"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarFornecedor } from "@/app/lib/api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function NovoFornecedor() {
    const [nome, setNome] = useState("");
    const router = useRouter();

    const handleAddFornecedor = async () => {
        await cadastrarFornecedor(nome);
        router.push("/dashboard/fornecedores");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Novo Fornecedor
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddFornecedor}
                    sx={{ mt: 2 }}
                >
                    Adicionar Fornecedor
                </Button>
            </Box>
        </Container>
    );
}
