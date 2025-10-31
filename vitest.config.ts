import { defineConfig } from 'vitest/config'
import { mergeConfig } from 'vite'
import storybookTest from '@storybook/addon-vitest/config'

export default mergeConfig(
  storybookTest({ configDir: '.storybook' }),
  defineConfig({
    test: {
      name: 'storybook',
      include: ['**/*.stories.@(js|jsx|ts|tsx)'],
      exclude: ['**/node_modules/**', '**/dist/**'],
      globals: true,
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
      },
    },
  })
)
