import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { version } from './package.json';
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/", // Adjust this if your app is hosted under a subpath
  build: {
    outDir: 'dist', // Ensure this matches Vercel's build expectations
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
})