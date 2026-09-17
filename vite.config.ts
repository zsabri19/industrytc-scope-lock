import { defineConfig } from "vite"

// Default `/` for Vercel / local. GitHub Pages workflow sets VITE_BASE=/industrytc-scope-lock/
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
})
