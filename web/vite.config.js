
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths for all assets
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0, // Ensure all assets are bundled and no external requests are made
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable code splitting for better compatibility
      }
    }
  },
  css: {
    postcss: "./postcss.config.cjs",
  }
})
