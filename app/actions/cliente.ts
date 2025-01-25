"use server";

import { createCliente } from "@/app/client";
import { redirect } from "next/navigation";

export async function createClienteAction(
    prevState: string | undefined,
    formData: FormData,
) {
    let error;

    try {
        const response = await createCliente({
            body: {
                nome: formData.get("nome") as string,
                email: formData.get("email") as string,
                categoria: formData.get("categoria") as string,
                endereco: formData.get("endereco") as string,
            },
        });
        error = response.error;
    } catch (e) {
        console.log(e);
        return "Falha na comunicação com a API.";
    }
    if (error) {
        console.log(error);
        return "Falha ao registrar o cliente.";
    }
    redirect("/dashboard/clientes");
}
