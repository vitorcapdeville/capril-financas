"use client";

import { authenticate } from "@/app/lib/actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function Login() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const [data, formAction, isPending] = useActionState(
        authenticate,
        { errorMessage: "", trialNumber: 0 },
    );

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (data?.errorMessage) {
            setOpen(true);
        }
    }, [data?.errorMessage, data?.trialNumber]);

    const handleClose = () => {
        setOpen(false);
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
                        aria-disabled={isPending}
                    >
                        Entrar
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {data?.errorMessage}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>
                                Fechar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </Container>
    );
}
