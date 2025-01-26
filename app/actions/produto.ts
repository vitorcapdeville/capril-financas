"use server";

import { createProduto } from "@/app/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProdutoAction(
    prevState: string | undefined,
    formData: FormData,
) {
    let error;

    try {
        const response = await createProduto({
            body: {
                nome: formData.get("nome") as string,
                peso_em_gramas: Number(formData.get("pesoEmGramas")),
            },
        });
        error = response.error;
    } catch (e) {
        console.log(e);
        return "Falha na comunicação com a API.";
    }
    if (error) {
        console.log(error);
        return "Falha ao registrar o produto.";
    }

    revalidatePath("/dashboard/produtos");
    redirect("/dashboard/produtos");
}
