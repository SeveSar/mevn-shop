import { fileURLToPath, URL } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    // checker({
    //   // e.g. use TypeScript check
    //   typescript: true,
    //   vueTsc: true,
    // }),
  ],
  // base: "/Pizza-spa-vue/",
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
    hmr: {
      overlay: true,
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/less/variables.less";`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
