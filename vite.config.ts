import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'bot-app-server.onrender.com',
      // Добавьте сюда другие хосты, если они будут меняться или появятся
      // например, '.ngrok.io' для всех поддоменов ngrok
    ],
    proxy: {
      '/api': {
        target: 'https://bot-app-server.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})