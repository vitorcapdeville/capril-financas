"use server";

import { CompraCreate, createCompra, deleteCompra } from "@/app/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCompraAction(
    data: CompraCreate,
) {
    let error;
    try {
        const response = await createCompra({
            body: data,
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
    revalidatePath("/dashboard/compras");
    redirect("/dashboard/compras");
}

export async function deleteCompraAction(
    id: number,
) {
    let error;
    try {
        const response = await deleteCompra({
            path: { id },
        });
        error = response.error;
    } catch (e) {
        console.log(e);
        return "Falha na comunicação com a API.";
    }
    if (error) {
        console.log(error);
        return error.detail || "Falha ao deletar a compra.";
    }
    revalidatePath("/dashboard/compras");
    redirect("/dashboard/compras");
}
