/// <reference types="vitest" />

import type { Nitro } from 'nitropack';

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// eslint-disable-next-line @typescript-eslint/naming-convention -- it's a function so it's fine to be in camelCase
const devBindingsModule = (nitro: Nitro): void => {
  if (nitro.options.dev) {
    nitro.options.plugins.push('./src/dev-bindings.ts');
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      nitro: {
        preset: 'cloudflare-pages',
        modules: [devBindingsModule],
      },
    }),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
