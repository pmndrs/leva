module.exports = {
  comments: false,
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
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
}
