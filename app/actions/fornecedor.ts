"use server";

import { createFornecedor, FornecedorCreate } from "@/app/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFornecedorAction(
    data: FornecedorCreate,
) {
    let error;
    try {
        const response = await createFornecedor({
            body: data,
        });
        error = response.error;
    } catch (e) {
        console.log(e);
        return "Falha na comunicação com a API.";
    }
    if (error) {
        console.log(error);
        return "Falha ao registrar o fornecedor.";
    }
    revalidatePath("/dashboard/fornecedores");
    // Compras faz o fetch da lista de fornecedores também, portanto, precisa revalidar também.
    revalidatePath("/dashboard/compras/novo");
    redirect("/dashboard/fornecedores");
}
