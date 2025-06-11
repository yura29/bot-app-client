import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'you-festival-web.onrender.com',
      // Добавьте сюда другие хосты, если они будут меняться или появятся
      // например, '.ngrok.io' для всех поддоменов ngrok
    ],
    proxy: {
      '/api': {
        target: 'https://you-festival-web.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})