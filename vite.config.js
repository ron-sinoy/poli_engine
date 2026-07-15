import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { API_PROXY_TARGET } from './api.config.js'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const proxyTarget = API_PROXY_TARGET.trim();

  return {
    plugins: [react()],
    server: proxyTarget
      ? {
          proxy: {
            '/api': {
              target: proxyTarget,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          },
        }
      : undefined,
  };
})
