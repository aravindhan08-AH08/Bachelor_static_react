import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    base: command === 'build' ? '/Bachelor_static_react/' : '/',
  }
})
