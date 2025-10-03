import { defineProjectConfig } from '@fabdeh/eslint-config';

import baseConfig from '../../eslint.config.mjs';

export default defineProjectConfig(
  baseConfig,
  {
    type: 'app',
    jsonc: false, // TODO: remove when @fabdeh/eslint-config@0.8.0-beta.3 or later is released
    tailwindcss: {
      entryPoint: 'apps/website/src/styles.css',
    },
    angular: {
      prefix: 'app',
      componentStylesMode: 'string',
      enableAccessibilityRules: true,
      preferOnPushOnly: true,
    },
    ignores: ['worker-configuration.d.ts', 'typography.ts'],
  }
);
