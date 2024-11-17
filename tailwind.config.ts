import { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
   content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
   theme: {
      fontFamily: {
         poppins: ["Poppins", "sans-serif"],
      },
      extend: {
         backgroundColor: {
            themeColor: "#00735c",
         },
         textColor: {
            accent: "#F4C699",
         },
      },
   },
   plugins: [typography],
} satisfies Config;
