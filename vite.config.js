import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: base must match your repo name for GitHub Pages, e.g. "/exchange-ledger/"
export default defineConfig({
  plugins: [react()],
base: "/Exchange-Dashboard-/",
});
