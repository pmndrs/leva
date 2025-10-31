import { defineConfig } from 'vitest/config'
import storybookTest from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig(async () => {
  const storybookPlugins = await storybookTest({ configDir: '.storybook' })
  return {
    plugins: storybookPlugins,
    test: {
      name: 'storybook',
      include: ['**/*.stories.@(js|jsx|ts|tsx)'],
      exclude: ['**/node_modules/**', '**/dist/**'],
      globals: true,
      browser: {
        enabled: true,
        name: 'chromium',
        provider: playwright(),
        instances: [playwright()],
      },
    },
  }
})
