import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
import Checker from 'vite-plugin-checker';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    Checker({ typescript: true }),
    // checker({
    //   // e.g. use TypeScript check
    //   typescript: true,
    //   vueTsc: true,
    // }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: 'src/setupFiles.ts',
    globals: true,
  },
  // base: "/Pizza-spa-vue/",
  build: {
    sourcemap: true,
    target: 'es2015',
  },
  server: {
    port: 3000,
    hmr: {
      overlay: true,
    },
    watch: {
      ignored: ['!**/node_modules/pizza-mevn-ui-kit/**'], // Указываем, чтобы Vite не игнорировал симлинк
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/variables.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),

    },
    preserveSymlinks: true, // Включает поддержку символических ссылок
  },
});
