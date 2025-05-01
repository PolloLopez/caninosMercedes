//carpeta raiz >vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 

export default defineConfig({
  plugins: [react()],
  base: '/', // Base path correcto
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 👈 Definimos alias @ para src
    },
  },
  server: {
    historyApiFallback: true, // Permite navegación con React Router en desarrollo
  }
});
