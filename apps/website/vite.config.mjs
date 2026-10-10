/// <reference types="vitest" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/website',
    build: {
      outDir: '../../dist/apps/website/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    resolve: {
      mainFields: ['module'],
    },
    plugins: [
      analog({
        ssr: true,
        prerender: {
          routes: mode === 'production' ? ['/', '/about'] : [],
          sitemap: {
            host: 'https://dehopre.dev',
          },
        },
        content: {
          highlighter: 'prism',
        },
      }),
      tailwindcss(),
      tsconfigPaths(),
      viteStaticCopy({
        targets: [{ src: '*.md', dest: '.' }],
        // Root `*.md` files are optional: copy them when present, without failing the build when there are none.
        silent: true,
      }),
    ],
    server: {
      fs: {
        allow: ['.'],
      },
    },
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/website',
        provider: 'v8',
        include: ['src/**/*.ts'],
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
