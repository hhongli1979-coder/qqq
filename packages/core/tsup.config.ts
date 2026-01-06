import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'ai/index': 'src/ai/index.ts',
    'storage/index': 'src/storage/index.ts',
    'http/index': 'src/http/index.ts',
    'constants/index': 'src/constants/index.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  external: []
});
