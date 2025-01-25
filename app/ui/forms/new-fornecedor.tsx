"use client";

import { createFornecedorAction } from "@/app/actions/fornecedor";
import { ErrorDialog } from "@/app/ui/error-dialog";
import { FormInputText } from "@/app/ui/form-components/form-inputs";
import PendingButton from "@/app/ui/form-components/pending-button";
import Box from "@mui/material/Box";
import { useActionState } from "react";

export default function FornecedorForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        createFornecedorAction,
        "",
    );
    return (
        <Box component="form" noValidate autoComplete="off" action={formAction}>
            <FormInputText
                name="nome"
                label="Nome"
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
