"use client";

import { authenticate } from "@/app/lib/actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        <Container maxWidth="sm">
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
        </Container>
    );
}
