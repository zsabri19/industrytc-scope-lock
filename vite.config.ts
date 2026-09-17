import { defineConfig } from "vite"

// GitHub Pages serves at https://<user>.github.io/<repo>/
export default defineConfig({
  base: process.env.VITE_BASE ?? "/industrytc-scope-lock/",
})
