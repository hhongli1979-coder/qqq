import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'icons/index': 'src/icons/index.ts',
    'animation/index': 'src/animation/index.ts',
    'components/index': 'src/components/index.ts',
    'hooks/index': 'src/hooks/index.ts',
    'utils/index': 'src/utils/index.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  onSuccess: async () => {
    // Copy CSS files to dist
    const fs = require('fs');
    const path = require('path');
    
    const copyCss = (src, dest) => {
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    };

    // Create dist directory if it doesn't exist
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist', { recursive: true });
    }

    // Copy animation CSS
    copyCss('src/animation/animations.css', 'dist/animation/animations.css');
    
    // Copy component CSS files
    const components = ['Button', 'Dialog'];
    components.forEach(component => {
      const src = `src/components/${component}/${component}.module.css`;
      const dest = `dist/components/${component}.module.css`;
      copyCss(src, dest);
    });

    // Create combined styles.css
    let allStyles = '';
    if (fs.existsSync('src/animation/animations.css')) {
      allStyles += fs.readFileSync('src/animation/animations.css', 'utf-8') + '\n';
    }
    components.forEach(component => {
      const src = `src/components/${component}/${component}.module.css`;
      if (fs.existsSync(src)) {
        allStyles += fs.readFileSync(src, 'utf-8') + '\n';
      }
    });
    fs.writeFileSync('dist/styles.css', allStyles);
  }
});
