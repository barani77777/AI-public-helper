import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/AI-public-helper/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
}));
