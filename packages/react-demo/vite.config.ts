import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';

const resolveSrc = (rel: string) =>
  fileURLToPath(new URL(rel, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@vertm/styles/index.css': resolveSrc('../styles/src/index.css'),
      '@vertm/react': resolveSrc('../react/src/index.ts'),
      '@vertm/core/dom': resolveSrc('../core/src/dom/index.ts'),
      '@vertm/core': resolveSrc('../core/src/index.ts'),
      '@vertm/tokens': resolveSrc('../tokens/src/index.ts'),
      '@vertm/icons/definitions': resolveSrc('../icons/src/definitions.ts'),
      '@vertm/icons': resolveSrc('../icons/src/index.ts'),
    },
  },
  server: { port: 5173 },
});
