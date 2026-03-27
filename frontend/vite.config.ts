import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // blocco per risolvere i percorsi
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
