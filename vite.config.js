import { defineConfig } from 'vite';
import { resolve } from 'path';
import { prerenderPlugin } from './scripts/prerender.mjs';

export default defineConfig({
    root: './',
    base: './',
    plugins: [prerenderPlugin()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
                paper: resolve(__dirname, 'paper.html'),
                notFound: resolve(__dirname, '404.html'),
            },
        },
        emptyOutDir: true,
    },
    server: {
        open: true,
    },
});
