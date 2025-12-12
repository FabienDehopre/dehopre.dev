/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

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
        ssr: false,
        static: true,
        prerender: {
          routes: [],
        },
        content: {
          highlighter: 'prism',
        }
      }),
      tailwindcss(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
    ],
    // server: {
    //   fs: {
    //     allow: ['.'],
    //   },
    // },
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
        provider: 'v8' as const,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
