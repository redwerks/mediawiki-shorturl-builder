import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig({
  plugins: [react(), macrosPlugin()],
  define: {
    'process.platform': '"browser"',
  },
  build: {
    sourcemap: true,
  },
});
