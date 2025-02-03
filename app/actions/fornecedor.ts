"use server";

import {
    createFornecedor,
    deleteFornecedor,
    FornecedorCreate,
} from "@/app/client";
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

export async function deleteFornecedorAction(id: number) {
    let error;
    try {
        const response = await deleteFornecedor({
            path: { id },
        });
        error = response.error;
    } catch (e) {
        console.log(e);
        return "Falha na comunicação com a API.";
    }
    if (error) {
        console.log(error);
        return error.detail || "Falha ao deletar o fornecedor.";
    }
    revalidatePath("/dashboard/fornecedores");
    // Compras faz o fetch da lista de fornecedores também, portanto, precisa revalidar também.
    revalidatePath("/dashboard/compras/novo");
    redirect("/dashboard/fornecedores");
}
