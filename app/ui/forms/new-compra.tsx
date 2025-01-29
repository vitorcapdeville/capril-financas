"use client";

import { createCompraAction } from "@/app/actions/compra";
import { CompraCreate, FornecedorPublic } from "@/app/client";
// import { zCompraCreate } from "@/app/client/zod.gen";
import { ErrorDialog } from "@/app/ui/error-dialog";
import {
    FormInputText,
    RHFAutocompleteField,
} from "@/app/ui/form-components/form-inputs";
import PendingButton from "@/app/ui/form-components/pending-button";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const zCompraCreate = z.object({
    data_compra: z.string().min(1, { message: "Campo obrigatório" }).date(),
    valor: z.coerce.number().min(1, { message: "Campo obrigatório" }),
    categoria: z.string().min(1, { message: "Campo obrigatório" }),
    fornecedor_id: z.coerce.number().min(1, { message: "Campo obrigatório" })
        .int(),
});

export default function CompraForm(
    { fornecedores }: { fornecedores: FornecedorPublic[] },
) {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<CompraCreate>({
        defaultValues: {
            data_compra: "",
            valor: "" as unknown as number,
            categoria: "",
            fornecedor_id: "" as unknown as number,
        },
        resolver: zodResolver(zCompraCreate),
    });

    const onSubmit = async (data: CompraCreate) => {
        const error = await createCompraAction(data);

        if (error) {
            setError("root", {
                type: "custom",
                message: error,
            });
        }
    };
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormInputText
                name="data_compra"
                label="Data da Compra"
                control={control}
                type="date"
            />
            <FormInputText
                name="valor"
                label="Valor"
                control={control}
                type="number"
            />
            <FormInputText
                name="categoria"
                label="Categoria"
                control={control}
            />
            <RHFAutocompleteField
                options={fornecedores.map((fornecedor) => {
                    return {
                        id: String(fornecedor.id),
                        label: fornecedor.nome,
                    };
                })}
                control={control}
                name="fornecedor_id"
                placeholder="Fornecedor"
            />

            <PendingButton
                isPending={isSubmitting}
                text="Adicionar"
                pendingText="Adicionando..."
            />
            <ErrorDialog
                error={errors.root}
            />
        </Box>
    );
}
