"use client";

import { authenticate } from "@/app/lib/actions";
import { ErrorDialog } from "@/app/ui/error-dialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        "",
    );

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
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    action={formAction}
                >
                    <TextField
                        fullWidth
                        margin="normal"
                        type="email"
                        label="Email"
                        name="email"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        type="password"
                        label="Senha"
                        name="password"
                    />
                    <input
                        type="hidden"
                        name="redirectTo"
                        value={callbackUrl}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? "Entrando..." : "Entrar"}
                    </Button>
                    <ErrorDialog errorMsg={errorMessage || null} />
                </Box>
            </Box>
        </Container>
    );
}
