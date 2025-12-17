import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './', // Root directory is the project root
  base: './', // Relative base path for deployment
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        paper: resolve(__dirname, 'paper.html'),
      },
    },
    emptyOutDir: true,
  },
  server: {
    open: true, // Auto open browser on start
  },
});
