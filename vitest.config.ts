import { defineConfig } from 'vitest/config'
import storybookTest from '@storybook/addon-vitest/vitest-plugin'

const storybookPlugins = await storybookTest({ configDir: '.storybook' })

export default defineConfig({
  plugins: storybookPlugins,
  test: {
    name: 'storybook',
    include: ['**/*.stories.@(js|jsx|ts|tsx)'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    globals: true,
    browser: {
      enabled: true,
      name: 'chromium',
      // @ts-expect-error - provider type definition issue in vitest
      provider: 'playwright',
    },
  },
})
