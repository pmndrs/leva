import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/plugin/index.ts',
    'src/headless/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  clean: false,
})
