import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@example': path.resolve('example'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {

    // commonjsOptions: { include: 'node_modules/**' }
  },
  optimizeDeps: {
    // include: ['node_modules/insert-css/index.js']
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      scss: {

      }
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://h5.maocanhua.cn',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
  plugins: [reactRefresh()]
});
