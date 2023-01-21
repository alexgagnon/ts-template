import { defineConfig } from "vite";
import { name } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "out-tsc/index.js",
      formats: ["es", "iife"],
      name,
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
