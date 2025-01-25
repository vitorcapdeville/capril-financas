"use client";

import { createCompraAction } from "@/app/actions/compra";
import { ErrorDialog } from "@/app/ui/error-dialog";
import {
    FormInputDate,
    FormInputNumber,
    FormInputText,
} from "@/app/ui/form-components/form-inputs";
import PendingButton from "@/app/ui/form-components/pending-button";
import Box from "@mui/material/Box";
import { useActionState } from "react";

export default function CompraForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        createCompraAction,
        "",
    );
    return (
        <Box component="form" noValidate autoComplete="off" action={formAction}>
            <FormInputDate
                name="dataCompra"
                label="Data da Compra"
            />
            <FormInputNumber
                name="valor"
                label="Valor"
            />
            <FormInputText
                name="categoria"
                label="Categoria"
            />
            {
                /* <Autocomplete
                disablePortal
                options={fornecedores}
                getOptionLabel={(option: Fornecedor) =>
                    option.nome}
                fullWidth
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Fornecedor"
                        required
                    />
                )}
                onChange={(_, value) => {
                    if (value) {
                        setFornecedorId(value.id.toString());
                    } else {
                        setFornecedorId("");
                    }
                }}
            /> */
            }

            <PendingButton
                isPending={isPending}
                text="Adicionar"
                pendingText="Adicionando..."
            />
            <ErrorDialog errorMsg={errorMessage || null} />
        </Box>
    );
}
