import { client } from "@/app/client/sdk.gen"; // !! PRECISA RODAR ANTES DO getToken !!
import { getToken } from "@/app/actions/login";

client.setConfig({
  baseUrl: process.env.BACKEND_URL,
  auth: () => getToken(),
  cache: "force-cache",
  next: { revalidate: 3600 },
});

export { client };
