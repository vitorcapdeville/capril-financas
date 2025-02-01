import { getToken } from "@/app/actions/login";
import type { CreateClientConfig } from "@hey-api/client-next";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: process.env.BACKEND_URL,
  auth: () => getToken(),
  cache: "no-store",
  // cache: "force-cache",
  // next: { revalidate: 3600 },
});
