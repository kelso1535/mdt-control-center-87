
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';
import tailwindcssPostcss from '@tailwindcss/postcss';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    assetsInlineLimit: 0
  },
  css: {
    postcss: {
      plugins: [
        tailwindcssPostcss(),
        autoprefixer,
      ],
    },
  },
  assetsInclude: ['**/*.ttf']
});
