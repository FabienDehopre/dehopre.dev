import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig({
  ignores: ['pnpm-lock.yaml', 'worker-configuration.d.ts'],
  formatters: true,
  typescript: { enableErasableSyntaxOnly: true },
});
