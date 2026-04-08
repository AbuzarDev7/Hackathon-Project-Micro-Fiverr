import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
=======
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
      }
    }
  }
})

