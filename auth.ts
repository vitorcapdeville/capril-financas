import { login } from "@/app/client/sdk.gen";
import { client } from "@/app/clientConfig";
import { User } from "@/app/lib/definitions";
import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

client.getConfig();

function getPayloadFromToken(access_token: string): User {
    const encodedPayload = access_token.split(".")[1];
    const decodedToken = JSON.parse(atob(encodedPayload));
    const user = {
        id: decodedToken.id,
        access_token: access_token,
    } as User;
    return user;
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z
                            .string()
                            .min(
                                parseInt(
                                    process.env.PASSWORD_MIN_LENGTH || "1",
                                ),
                            ),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    let data;
                    let error;

                    try {
                        const response = await login({
                            body: { username: email, password },
                        });
                        data = response.data;
                        error = response.error;
                    } catch (e) {
                        throw Error("Falha de comunicação com a API.");
                    }

                    if (error) {
                        throw Error(String(error.detail));
                    }

                    if (data) {
                        return getPayloadFromToken(data.access_token);
                    }
                }

                return null;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                // User is available during sign-in
                // @ts-ignore
                token.access_token = user.access_token;
            }
            return token;
        },
        session({ session, token }) {
            // @ts-ignore
            session.user.access_token = token.access_token as string;
            return session;
        },
    },
});
