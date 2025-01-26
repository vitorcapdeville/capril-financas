"use client";

import { authenticate } from "@/app/actions/login";
import { ErrorDialog } from "@/app/ui/error-dialog";
import PendingButton from "@/app/ui/form-components/pending-button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        "",
    );
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
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
                    action={(formData) => {
                        formAction(formData);
                        setOpen(true);
                    }}
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
                        type={showPassword ? "text" : "password"}
                        label="Senha"
                        name="password"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton
                                        aria-label={showPassword
                                            ? "hide the password"
                                            : "display the password"}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword
                                            ? <VisibilityOff />
                                            : <Visibility />}
                                    </IconButton>
                                ),
                            },
                        }}
                    />

                    <input
                        type="hidden"
                        name="redirectTo"
                        value={callbackUrl}
                    />
                    <PendingButton
                        isPending={isPending}
                        text="Entrar"
                        pendingText="Entrando..."
                    />
                    <ErrorDialog
                        errorMsg={errorMessage || null}
                        open={open}
                        handleClose={() => setOpen(false)}
                    />
                </Box>
            </Box>
        </Container>
    );
}
