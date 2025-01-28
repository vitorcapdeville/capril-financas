import { defineConfig } from "@hey-api/openapi-ts";
import { defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "openapi.json",
  output: "app/client",
  plugins: [
    ...defaultPlugins,
    'zod',
    // {
    //   name: '@hey-api/sdk', 
    //   validator: true, 
    // },
  ],
});
