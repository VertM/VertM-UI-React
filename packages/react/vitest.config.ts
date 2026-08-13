import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/index.ts'],
      reporter: ['text', 'lcov'],
      // Ratchet only — raise these as more components gain tests.
      thresholds: {
        lines: 40,
        statements: 40,
        functions: 65,
        branches: 74,
      },
    },
  },
});
