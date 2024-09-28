import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  experimental: {
    env: {
      schema: {
        PROD_ENV: envField.boolean({
          context: "client",
          access: "public",
          optional: false,
        }),
      },
    },
  },
  integrations: [tailwind(), react()],
  devToolbar: {
    enabled: false,
  },
  output: "server",
  adapter: vercel(),
  serviceWorker: true,
});
