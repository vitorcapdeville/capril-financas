"use client";

import { authenticate } from "@/app/actions/login";
import { getFormData } from "@/app/lib/utils";
import { ErrorDialog } from "@/app/ui/error-dialog";
import { FormInputText } from "@/app/ui/form-components/form-inputs";
import PendingButton from "@/app/ui/form-components/pending-button";
import { ShowablePassword } from "@/app/ui/form-components/showable-password";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const zLogin = z.object({
    username: z.string().min(1, { message: "Campo obrigatório" }).email({
        message: "Email inválido",
    }),
    password: z.string().min(1, { message: "Campo obrigatório" }),
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
        const formData = getFormData(data);

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
                    <FormInputText
                        name="username"
                        label="Email"
                        control={control}
                        type="email"
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
