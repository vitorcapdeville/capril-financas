"use client";

import { createCompraAction } from "@/app/actions/compra";
import { FornecedorPublic } from "@/app/client";
import { ErrorDialog } from "@/app/ui/error-dialog";
import {
    FormInputDate,
    FormInputNumber,
    FormInputText,
} from "@/app/ui/form-components/form-inputs";
import PendingButton from "@/app/ui/form-components/pending-button";
import { Autocomplete, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useActionState, useState } from "react";

export default function CompraForm(
    { fornecedores }: { fornecedores: FornecedorPublic[] },
) {
    const [fornecedorId, setFornecedorId] = useState<number | null>(null);
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
                /* Esse input passa o id pro formData associado ao autocomplete
                Não consegui achar um jeito de pegar o id dentro do autocomplete */
            }
            <input
                hidden
                name="fornecedor_id"
                type="number"
                value={Number(fornecedorId)}
                readOnly
            />

            <Autocomplete
                disablePortal
                options={fornecedores}
                getOptionKey={(option: FornecedorPublic) =>
                    option.id}
                getOptionLabel={(option: FornecedorPublic) =>
                    option.nome}
                onChange={(e, value) => {
                    setFornecedorId(value?.id || null);
                }}
                fullWidth
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            label="Fornecedor"
                            required
                        />
                    );
                }}
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
