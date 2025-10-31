const path = require('path')

module.exports = {
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: false,
        lazyCompilation: false,
      }
    }
  },
  core: {
    disableWebpackDefaults: false,
  },
  typescript: {
    reactDocgen: 'none',
    check: false,
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
    ],
  }),
  webpackFinal: async (config) => {
    // Add babel-loader for TS/TSX/JS/JSX files in our packages and .storybook
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: [
        path.resolve(__dirname, '../packages'),
        path.resolve(__dirname),
      ],
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-typescript'),
            ],
            compact: false,
          },
        },
      ],
    })
    
    // Ensure .ts/.tsx extensions are resolved
    config.resolve.extensions.push('.ts', '.tsx')
    
    // Add packages node_modules to resolution paths
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../packages/leva/node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ]
    
    // manually resolve packages so storybook uses local source
    config.resolve.alias['leva/plugin'] = path.resolve(__dirname, '../packages/leva/src/plugin/index.ts')
    config.resolve.alias['leva/stories'] = path.resolve(__dirname, '../packages/leva/stories')
    config.resolve.alias['leva/src'] = path.resolve(__dirname, '../packages/leva/src')
    config.resolve.alias['leva'] = path.resolve(__dirname, '../packages/leva/src')
    config.resolve.alias['@leva-ui/plugin-bezier'] = path.resolve(__dirname, '../packages/plugin-bezier/src')
    config.resolve.alias['@leva-ui/plugin-dates'] = path.resolve(__dirname, '../packages/plugin-dates/src')
    config.resolve.alias['@leva-ui/plugin-plot'] = path.resolve(__dirname, '../packages/plugin-plot/src')
    config.resolve.alias['@leva-ui/plugin-spring'] = path.resolve(__dirname, '../packages/plugin-spring/src')
    
    return config
  },
}
