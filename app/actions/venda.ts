"use server";

import { createVenda } from "@/app/client";
import { redirect } from "next/navigation";

export async function createVendaAction(
    prevState: string | undefined,
    formData: FormData,
) {
    let error;

    try {
        const response = await createVenda({
            body: {
                venda: {
                    data_venda: formData.get("dataVenda") as string,
                    data_pagamento: formData.get("dataPagamento") as string,
                },
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
    redirect("/dashboard/vendas");
}
