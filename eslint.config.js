//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import * as importPlugin from 'eslint-plugin-import';

export default [
  ...tanstackConfig,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
  },
];
