"use client";

import { authenticate } from "@/app/lib/actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", senha);
        await authenticate(undefined, formData);
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Image
                    src="/capril_logo.jpeg"
                    alt="Logo da Empresa"
                    width={300}
                    height={100}
                />
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <Box component="form" noValidate autoComplete="off">
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
                        type="password"
                        label="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        sx={{ mt: 2 }}
                    >
                        Entrar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
