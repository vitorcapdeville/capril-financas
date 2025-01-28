"use client";

import { authenticate } from "@/app/actions/login";
import { ErrorDialog } from "@/app/ui/error-dialog";
import PendingButton from "@/app/ui/form-components/pending-button";
import { ShowablePassword } from "@/app/ui/form-components/showable-password";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const zLogin = z.object({
    username: z.string().email(),
    password: z.string().min(1),
    redirectTo: z.string().optional(),
});

type LoginFormProps = z.infer<typeof zLogin>;

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const {
        control,
        handleSubmit,
        register,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<LoginFormProps>({
        defaultValues: {
            username: "",
            password: "",
            redirectTo: callbackUrl,
        },
        resolver: zodResolver(zLogin),
    });

    const onSubmit = async (data: LoginFormProps) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const error = await authenticate(formData);

        if (error) {
            setError("root", {
                type: "custom",
                message: error,
            });
        }
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
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name="username"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                fullWidth
                                margin="normal"
                                type="email"
                                label="Email"
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <ShowablePassword
                                {...field}
                                label="Senha"
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                    />

                    <input
                        {...register("redirectTo")}
                        type="hidden"
                        name="redirectTo"
                    />
                    <PendingButton
                        isPending={isSubmitting}
                        text="Entrar"
                        pendingText="Entrando..."
                    />
                    <ErrorDialog
                        error={errors.root}
                    />
                </Box>
            </Box>
        </Container>
    );
}
