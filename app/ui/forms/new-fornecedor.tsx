"use client";

import { createFornecedorAction } from "@/app/actions/fornecedor";
// import { zFornecedorCreate } from "@/app/client/zod.gen";
import { getFormData } from "@/app/lib/utils";
import { ErrorDialog } from "@/app/ui/error-dialog";
import { FormInputText } from "@/app/ui/form-components/form-inputs";
import PendingButton from "@/app/ui/form-components/pending-button";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { z } from "zod";

const zFornecedorCreate = z.object({
    nome: z.string().min(1, { message: "Campo obrigatório" }).max(50, {
        message: "Máximo de 50 caracteres",
    }),
});

type FornecedorFormProps = z.infer<typeof zFornecedorCreate>;

export default function FornecedorForm() {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<FornecedorFormProps>({
        defaultValues: {
            nome: "",
        },
        resolver: zodResolver(zFornecedorCreate),
    });

    const onSubmit = async (data: FornecedorFormProps) => {
        const formData = getFormData(data);

        const error = await createFornecedorAction(formData);

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
                name="nome"
                label="Nome"
                control={control}
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
