import { defineConfig } from "@hey-api/openapi-ts";
import { defaultPlugins } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "openapi.json",
  output: "app/client",
  plugins: [
    ...defaultPlugins,
    "zod",
    {
      name: "@hey-api/client-next",
      runtimeConfigPath: "./app/hey-api.ts",
    },
    // {
    //   name: '@hey-api/sdk',
    //   validator: true,
    // },
  ],
});
