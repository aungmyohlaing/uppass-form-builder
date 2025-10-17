import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  base: './', // ✅ Add this line to fix missing CSS/JS on Vercel

  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'pinia', 'vue-router'],
        },
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['vue', 'pinia', 'vue-router'],
  },
})
