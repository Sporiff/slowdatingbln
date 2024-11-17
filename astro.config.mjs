import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
   site: "https://slowdatingbln.com",
   integrations: [
      tailwind(),
   ],
   experimental: {
      env: {
         schema: {
            GRAPHQL_ENDPOINT: envField.string({ context: "client", access: "public", optional: false })
         }
      }
   }
});
