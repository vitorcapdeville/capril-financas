"use server";

import { createVenda } from "@/app/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createVendaAction(
    prevState: string | undefined,
    formData: FormData,
) {
    let error;

    try {
        const response = await createVenda({
            body: {
                data_venda: formData.get("dataVenda") as string,
                data_pagamento: formData.get("dataPagamento") as string,
                cliente_id: 0,
                items: [],
            },
        });
        error = response.error;
    } catch (e) {
        console.log(e);
        return "Falha na comunicação com a API.";
    }
    if (error) {
        console.log(error);
        return "Falha ao registrar a venda.";
    }
    revalidatePath("/dashboard/vendas");
    redirect("/dashboard/vendas");
}
