import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// If your repo name is NOT exactly "prime-house-builders", change this:
const repoName = 'prime-house-builders';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const geminiKey = env.GEMINI_API_KEY ?? '';

  return {
    base: mode === 'production' ? '/prime-house-builders/' : '/',

    server: { port: 3000, host: '0.0.0.0' },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(geminiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
    },
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  };
});
