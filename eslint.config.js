import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'
import * as tsconfig from '@lvce-editor/eslint-plugin-tsconfig'
import * as regex from '@lvce-editor/eslint-plugin-regex'

export default [
  ...config.default,
  ...actions.default,
  ...tsconfig.default,
  ...regex.default,
  {
    files: ['packages/chat-debug-view/{src,test}/**/*.ts'],
    rules: {
      'jest/no-disabled-tests': 'off',
      'sonarjs/no-floating-point-equality': 'off',
      'sonarjs/no-trivial-assertions': 'off',
      'sonarjs/super-linear-regex': 'off',
      'unicorn/no-array-fill-with-reference-type': 'off',
      'unicorn/no-array-from-fill': 'off',
      'unicorn/no-break-in-nested-loop': 'off',
      'unicorn/no-declarations-before-early-exit': 'off',
      'unicorn/no-unnecessary-global-this': 'off',
      'unicorn/no-useless-template-literals': 'off',
      'unicorn/prefer-global-number-constants': 'off',
      'unicorn/prefer-includes-over-repeated-comparisons': 'off',
      'unicorn/prefer-minimal-ternary': 'off',
      'unicorn/prefer-number-coercion': 'off',
      'unicorn/prefer-number-is-safe-integer': 'off',
      'unicorn/prefer-object-iterable-methods': 'off',
    },
  },
]
