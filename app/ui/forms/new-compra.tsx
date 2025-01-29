"use client";

import { createCompraAction } from "@/app/actions/compra";
import { FornecedorPublic } from "@/app/client";
import { getFormData } from "@/app/lib/utils";
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
    data_compra: z.string().date(),
    valor: z.coerce.number(),
    categoria: z.string(),
    fornecedor_id: z.coerce.number().int(),
});
type CompraFormProps = z.infer<typeof zCompraCreate>;

export default function CompraForm(
    { fornecedores }: { fornecedores: FornecedorPublic[] },
) {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<CompraFormProps>({
        defaultValues: {
            data_compra: "",
            valor: 0,
            categoria: "",
            fornecedor_id: 0,
        },
        resolver: zodResolver(zCompraCreate),
    });

    const onSubmit = async (data: CompraFormProps) => {
        console.log(data);
        const formData = getFormData(data);

        const error = await createCompraAction(formData);

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
