"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { buscarClientePorId } from "@/app/lib/api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function ClienteDetalhes() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [cliente, setCliente] = useState<any>(null);

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const cliente = await buscarClientePorId(Number(id));
                setCliente(cliente);
            } catch (error) {
                console.error(error);
            }
        };
        if (id) {
            fetchCliente();
        }
    }, [id]);

    if (!cliente) {
        return <div>Carregando...</div>;
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Detalhes do Cliente
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Nome"
                    value={cliente.nome}
                    slotProps={{ input: { readOnly: true } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    value={cliente.email}
                    slotProps={{ input: { readOnly: true } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Categoria"
                    value={cliente.categoria}
                    slotProps={{ input: { readOnly: true } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Endereço"
                    value={cliente.endereco}
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
