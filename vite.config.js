import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()  // Call tailwindcss as a function inside the plugins array
  ],
  assetsInclude: ['**/*.glb'],
})