import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = env.VITE_API_PROXY_TARGET?.trim();

  return {
    plugins: [react()],
    server: proxyTarget
      ? {
          proxy: {
            '/threadsList': proxyTarget,
            '/threads': proxyTarget,
            '/cache': proxyTarget,
          },
        }
      : undefined,
  };
})
