"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarCliente } from "@/app/lib/api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function NovoCliente() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [categoria, setCategoria] = useState("");
    const [endereco, setEndereco] = useState("");
    const router = useRouter();

    const handleAddCliente = async () => {
        await cadastrarCliente({ nome, email, categoria, endereco });
        router.push("/clientes");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Novo Cliente
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
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="text"
                    label="Categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="text"
                    label="Endereço"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCliente}
                    sx={{ mt: 2 }}
                >
                    Adicionar Cliente
                </Button>
            </Box>
        </Container>
    );
}
