import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['**/*.test.ts', '**/node_modules/**', '**/dist/**'],
  },
  resolve: {
    alias: {
      leva: resolve(__dirname, './packages/leva/src'),
    },
  },
})
