import { defineProjectConfig } from '@fabdeh/eslint-config';
import playwright from 'eslint-plugin-playwright';

import baseConfig from '../../eslint.config.mjs';

export default defineProjectConfig(
  baseConfig,
  {
    type: 'app',
    angular: false,
    ngrx: false,
    vitest: false,
  },
  playwright.configs['flat/recommended']
);
