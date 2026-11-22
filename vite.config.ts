import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import sassDts from 'vite-plugin-sass-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
    react(),
    sassDts({
      enabledMode: ['development'],
      esmExport: true,
    }),
    tsconfigPaths(),
  ],
  base: '',
  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const fileName = filename.split('/').pop()?.replace('.module.scss', '') ?? '';

        const prefix = fileName === 'app' ? 'index-module' : `${fileName}-module`;

        return `${prefix}__${name}`;
      },
    },
    preprocessorOptions: {
      scss: {
        // @ts-expect-error api is a valid sass option but not in Vite's types yet
        api: 'modern-compiler',
      },
    },
  },
  server: {
    open: true,
  },
});
