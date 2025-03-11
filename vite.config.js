import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/astro-mandeep": {
        target: "https://api.astro-mandeep.com",
        secure: false,
      },
      // "/astro-mandeep": {
      //   target: "http://localhost:5000",
      //   secure: false,
      // },
    },
  },
  plugins: [react()],
});
