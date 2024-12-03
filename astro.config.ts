import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
   site: "https://slowdatingbln.com",
   integrations: [
      tailwind(),
   ],
   env: {
      schema: {
         GRAPHQL_ENDPOINT: envField.string({
            context: "client",
            access: "public",
            optional: false,
         }),
      },
   },
});
