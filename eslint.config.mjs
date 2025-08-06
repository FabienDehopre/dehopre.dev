import { defineConfig } from '@fabdeh/eslint-config';
import nx from '@nx/eslint-plugin';

export default await defineConfig(
  {
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
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
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
