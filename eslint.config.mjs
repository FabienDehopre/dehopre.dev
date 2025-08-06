import { defineConfig } from '@fabdeh/eslint-config';
import nx from '@nx/eslint-plugin';

export default await defineConfig(
  {
    ignores: ['**/worker-configuration.d.ts', '**/typography.ts'],
    jsdoc: false,
    tailwindcss: {
      entryPoint: 'apps/website/src/styles.css',
    },
  },
  ...nx.configs['flat/base'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [String.raw`^.*/eslint(\.base)?\.config\.[cm]?[jt]s$`],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        }
      ],
    },
  }
);
