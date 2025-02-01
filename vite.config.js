import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Asegura que el base path es correcto
  server: {
    historyApiFallback: true, // Permite navegación con React Router en desarrollo
  }
});
