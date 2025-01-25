"use client";

import { createClienteAction } from "@/app/actions/cliente";
import { ErrorDialog } from "@/app/ui/error-dialog";
import { FormInputText } from "@/app/ui/form-components/form-inputs";
import PendingButton from "@/app/ui/form-components/pending-button";
import Box from "@mui/material/Box";
import { useActionState } from "react";

export default function ClienteForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        createClienteAction,
        "",
    );
    return (
        <Box component="form" noValidate autoComplete="off" action={formAction}>
            <FormInputText
                name="nome"
                label="Nome"
            />
            <FormInputText
                name="email"
                label="Email"
            />
            <FormInputText
                name="categoria"
                label="Categoria"
            />
            <FormInputText
                name="endereco"
                label="Endereço"
            />

            <PendingButton
                isPending={isPending}
                text="Adicionar"
                pendingText="Adicionando..."
            />
            <ErrorDialog errorMsg={errorMessage || null} />
        </Box>
    );
}
