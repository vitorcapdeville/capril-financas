"use server";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
    prevState: { errorMessage: string; trialNumber: number } | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        errorMessage: "Email ou senha inválidos.",
                        trialNumber: prevState ? prevState.trialNumber + 1 : 1,
                    };
                case "CallbackRouteError":
                    return {
                        errorMessage: error.cause?.err?.message ||
                            "Algo deu errado.",
                        trialNumber: prevState ? prevState.trialNumber + 1 : 1,
                    };
                default:
                    return {
                        errorMessage: "Algo deu errado.",
                        trialNumber: prevState ? prevState.trialNumber + 1 : 1,
                    };
            }
        }
        throw error;
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
