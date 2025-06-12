import { defineConfig } from "@fabdeh/eslint-config";

export default defineConfig({
  ignores: ['pnpm-lock.yaml'],
  formatters: true,
  typescript: { enableErasableSyntaxOnly: true },
});
