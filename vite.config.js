// vite.config.js (en carpeta raíz)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 👈 Alias para src
    },
  },
  server: {
    historyApiFallback: true, // 👈 React Router compatible en dev
  },
  build: {
    outDir: 'dist',
  },
  base: '/', // Solo si estás desplegando en la raíz del dominio
});
