import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getCss should add hover styling for unselected quick filter pills', () => {
  const css = getCss(createDefaultState())

  expect(css).toContain('.ChatDebugViewQuickFilterPill:not(.ChatDebugViewQuickFilterPillSelected):hover {')
  expect(css).toContain('background: color-mix(in srgb, var(--vscode-list-hoverBackground, rgba(90, 93, 94, 0.16)) 82%, transparent 18%);')
})
