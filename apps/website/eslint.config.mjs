import { defineProjectConfig } from '@fabdeh/eslint-config';

import baseConfig from '../../eslint.config.mjs';

export default defineProjectConfig(
  baseConfig,
  {
    type: 'app',
    tailwindcss: {
      entryPoint: 'apps/website/src/styles.css',
    },
    angular: {
      prefix: 'app',
      componentStylesMode: 'string',
      enableAccessibilityRules: true,
      preferOnPushOnly: true,
    },
    ignores: ['**/worker-configuration.d.ts', '**/typography.ts'],
  }
);
