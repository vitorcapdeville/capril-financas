import { client } from "@/app/client/sdk.gen";
import { getToken } from "@/app/actions/login";

client.setConfig({
  baseUrl: process.env.BACKEND_URL,
  auth: () => getToken(),
});

export { client };