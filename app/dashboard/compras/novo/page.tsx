"use client";

import { buscarFornecedores, cadastrarCompra } from "@/app/lib/api";
import { Fornecedor } from "@/app/lib/definitions";
import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NovaCompra() {
    const [dataCompra, setDataCompra] = useState("");
    const [valor, setValor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fornecedorId, setFornecedorId] = useState("");
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fectchFornecedores = async () => {
            const results = await buscarFornecedores("");
            setFornecedores(results);
        };
        fectchFornecedores();
    }, []);

    const handleAddCompra = async () => {
        await cadastrarCompra({
            data_compra: dataCompra,
            valor: Number(valor),
            categoria,
            fornecedor_id: Number(fornecedorId),
        });
        router.push("/dashboard/compras");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Nova Compra
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    slotProps={{ inputLabel: { shrink: true } }}
                    fullWidth
                    margin="normal"
                    type="date"
                    label="Data da Compra"
                    value={dataCompra}
                    onChange={(e) => setDataCompra(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="number"
                    label="Valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="text"
                    label="Categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
                <Autocomplete
                    disablePortal
                    options={fornecedores}
                    getOptionLabel={(option: Fornecedor) => option.nome}
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Fornecedor"
                            required
                        />
                    )}
                    onChange={(_, value) => {
                        if (value) {
                            setFornecedorId(value.id.toString());
                        } else {
                            setFornecedorId("");
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCompra}
                    sx={{ mt: 2 }}
                >
                    Adicionar Compra
                </Button>
            </Box>
        </Container>
    );
}
