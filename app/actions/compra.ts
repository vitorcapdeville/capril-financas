"use server";

import { createCompra } from "@/app/client";
import { redirect } from "next/navigation";

export async function createCompraAction(
    prevState: string | undefined,
    formData: FormData,
) {
    let error;
    console.log(formData);
    try {
        const response = await createCompra({
            body: {
                categoria: formData.get("categoria") as string,
                data_compra: formData.get("dataCompra") as string,
                valor: Number(formData.get("valor")),
                fornecedor_id: Number(formData.get("fornecedor_id")),
            },
        });
        error = response.error;
    } catch (e) {
        console.log(e);
        return "Falha na comunicação com a API.";
    }
    if (error) {
        console.log(error);
        return "Falha ao registrar a compra.";
    }
    redirect("/dashboard/compras");
}
