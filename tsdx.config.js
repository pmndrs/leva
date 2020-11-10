const postcss = require('rollup-plugin-postcss')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [postcssPresetEnv({ stage: 0 })],
        minimize: true,
        modules: {
          generateScopedName: '[hash:base64:5]',
        },
      })
    )
    return config
  },
}
