import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"), 
      "@assets": path.resolve(__dirname, "./src/assets"), 
      "@images": path.resolve(__dirname, "./src/assets/images"), 
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://api.ekiwitrade.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    port: 3000,
  },
});
