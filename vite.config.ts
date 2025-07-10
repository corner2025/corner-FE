import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      port: 5000,
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  })
}
