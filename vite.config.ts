import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/v1': 'http://localhost:8080',
    },
  },
  build: {
    outDir: 'build',
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
