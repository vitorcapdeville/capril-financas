"use client";

import { createClienteAction } from "@/app/actions/cliente";
import { ErrorDialog } from "@/app/ui/error-dialog";
import { FormInputText } from "@/app/ui/form-components/form-inputs";
import PendingButton from "@/app/ui/form-components/pending-button";
import Box from "@mui/material/Box";
import { useActionState, useState } from "react";

export default function ClienteForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        createClienteAction,
        "",
    );
    const [open, setOpen] = useState(false);

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            action={(formData) => {
                formAction(formData);
                setOpen(true);
            }}
        >
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
            <ErrorDialog
                errorMsg={errorMessage || null}
                open={open}
                handleClose={() => setOpen(false)}
            />
        </Box>
    );
}
