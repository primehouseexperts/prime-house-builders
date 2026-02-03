import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT:
// If your repo name is NOT exactly "prime-house-builders", change this constant.
// For GitHub Pages project sites, Vite base must be "/<repo-name>/".
const repoName = 'prime-house-builders';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  // Prevent build issues when GEMINI_API_KEY is not set in GitHub Actions.
  const geminiKey = env.GEMINI_API_KEY ?? '';

  return {
    // This is the key part for GitHub Pages: assets must be loaded from /<repoName>/...
    base: mode === 'production' ? `/${repoName}/` : '/',

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [react()],

    define: {
      'process.env.API_KEY': JSON.stringify(geminiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
