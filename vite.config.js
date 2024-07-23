import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/mualaApp/', // Only needed for GitHub Pages deployment
});
