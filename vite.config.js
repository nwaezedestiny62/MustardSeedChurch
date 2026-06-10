import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // You can add other heavy libraries here later if needed
        },
      },
    },
    chunkSizeWarningLimit: 800,   // Lowered since we removed 3D
  },
})