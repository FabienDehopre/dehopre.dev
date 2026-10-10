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
      inlineTemplateAndStyles: true,
      banExperimentalApi: false,
      banDeveloperPreviewApi: false,
    },
  },
  {
    // index.html is parsed as plain HTML, where `<app-root />` is an open tag that swallows the next sibling.
    files: ['index.html'],
    rules: {
      '@angular-eslint/template/prefer-self-closing-tags': 'off',
    },
  }
);
