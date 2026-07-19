import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'
import * as tsconfig from '@lvce-editor/eslint-plugin-tsconfig'
import * as regex from '@lvce-editor/eslint-plugin-regex'

export default [
  ...config.default,
  ...config.recommendedVirtualDom,
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
  {
    files: ['packages/e2e/**/*.ts'],
    rules: {
      'e2e/no-imports': 'off',
      'virtual-dom/no-object-attribute-values': 'off',
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
      'virtual-dom/prefer-state-destructuring': 'off',
      'virtual-dom/valid-child-count': 'off',
    },
  },
  {
    files: ['packages/chat-debug-view/test/**/*.ts'],
    rules: {
      'virtual-dom/clickable-div-needs-role': 'off',
      'virtual-dom/no-inline-style': 'off',
      'virtual-dom/no-object-attribute-values': 'off',
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
      'virtual-dom/prefer-state-destructuring': 'off',
      'virtual-dom/valid-child-count': 'off',
    },
  },
  {
    files: ['packages/chat-debug-view/src/**/*.ts'],
    rules: {
      'virtual-dom/prefer-state-destructuring': 'off',
    },
  },
  {
    files: [
      'packages/chat-debug-view/src/parts/GetCursorGuideNodes/GetCursorGuideNodes.ts',
      'packages/chat-debug-view/src/parts/GetEditorSelectionDom/GetEditorSelectionDom.ts',
      'packages/chat-debug-view/src/parts/GetSelectionNodesDom/GetSelectionNodesDom.ts',
      'packages/chat-debug-view/src/parts/GetTimelineBadgeNodes/GetTimelineBadgeNodes.ts',
      'packages/chat-debug-view/src/parts/GetTimingPreviewDom/GetTimingPreviewDom.ts',
      'packages/chat-debug-view/src/parts/GetTimingPreviewSegmentNodes/GetTimingPreviewSegmentNodes.ts',
    ],
    rules: {
      'virtual-dom/no-inline-style': 'off',
    },
  },
]
