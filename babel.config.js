module.exports = {
  comments: false,
  parser: '@babel/eslint-parser',
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        targets: {
          esmodules: true,
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
}
