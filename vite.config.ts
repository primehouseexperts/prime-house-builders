import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  // ✅ IMPORTANT:
  // For GitHub Pages project sites: https://USERNAME.github.io/REPO/
  // base must be "/REPO/"
  //
  // If you're deploying to a user site repo named USERNAME.github.io, set base: "/"
  const repo = 'prime-house-builders';

  return {
    base: mode === 'production' ? `/${repo}/` : '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
