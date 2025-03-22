
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    assetsInlineLimit: 0, // Ensure all assets are bundled and no external requests are made
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
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
  assetsInclude: ['**/*.ttf'], // Explicitly include font files as assets
}));
