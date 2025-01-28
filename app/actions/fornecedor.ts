"use server";

import { createFornecedor } from "@/app/client";
import { redirect } from "next/navigation";
// Não parece ideal esse import. Eu queria apenas configurar em um lugar
// e não ter q preocupar com isso novamente, mas não está sendo considerado
// a config para server actions que são executadas em client components.
// Além disso, parece que simplesmente importar em alguma das actions resolve para as outras.
// Estranhamente, o login funciona.
import { client } from "@/app/clientConfig";
import { revalidatePath } from "next/cache";

export async function createFornecedorAction(
    prevState: string | undefined,
    formData: FormData,
) {
    client.getConfig(); // dummy call apenas para evitar erros de linter.
    let error;
    try {
        const response = await createFornecedor({
            body: {
                nome: formData.get("nome") as string,
            },
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
