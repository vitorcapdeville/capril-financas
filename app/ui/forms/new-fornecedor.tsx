"use client";

import { createFornecedorAction } from "@/app/actions/fornecedor";
import { ErrorDialog } from "@/app/ui/error-dialog";
import { FormInputText } from "@/app/ui/form-components/form-inputs";
import PendingButton from "@/app/ui/form-components/pending-button";
import Box from "@mui/material/Box";
import { useActionState, useState } from "react";

export default function FornecedorForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        createFornecedorAction,
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
