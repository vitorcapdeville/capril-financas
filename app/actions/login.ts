"use server";

import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Email ou senha inválidos.";
                case "CallbackRouteError":
                    return error.cause?.err?.message ||
                        "Algo deu errado.";
                default:
                    return "Algo deu errado.";
            }
        }
        console.log(error);
        return `Erro desconhecido: ${error}`;
    }
}

export async function getToken() {
    const session = await auth();
    // @ts-expect-error Nao sei explicar pro auth.js que minha sessao tem esse atributo
    return session?.user?.access_token;
}

export async function signOutAction() {
    await signOut({ redirectTo: "/login" });
}
