
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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
        // Use explicit imports instead of dynamic requires
        import('tailwindcss'),
        import('autoprefixer'),
      ],
    },
  },
  assetsInclude: ['**/*.ttf']
});
