import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        theme_color: "#FF865B",
        lang: "pl",
        name: "Staszic-strzelnica",
        short_name: "Staszic-strzelnica",
        start_url: "/",
        display: "standalone",
        icons: [
          {
            src: "/staszic.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/staszic.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      devOptions: { enabled: true },
    }),
    react(),
  ],
});
