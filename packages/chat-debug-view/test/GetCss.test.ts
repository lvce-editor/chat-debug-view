import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getCss should use strict containment for chat details rows', () => {
  const css = getCss(createDefaultState())

  expect(css).toContain(`.row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  min-width: 100%;
  width: max-content;
  white-space: nowrap;
  contain: strict;
}`)
})

test('getCss should add hover styling for unselected quick filter pills', () => {
  const css = getCss(createDefaultState())

  expect(css).toContain('.ChatDebugViewQuickFilterPill:not(.ChatDebugViewQuickFilterPillSelected):hover {')
  expect(css).toContain('background: color-mix(in srgb, var(--vscode-list-hoverBackground, rgba(90, 93, 94, 0.16)) 82%, transparent 18%);')
})

test('getCss should style errored status cells with the vscode error foreground color', () => {
  const css = getCss(createDefaultState())

  expect(css).toContain('.ChatDebugViewCellStatusError {')
  expect(css).toContain('color: var(--vscode-errorForeground, #f14c4c);')
})

test('getCss should style the selected details tab with the vscode focus color', () => {
  const css = getCss(createDefaultState())

  expect(css).toContain('.ChatDebugViewDetailsTabSelected {')
  expect(css).toContain('color: var(--vscode-focusBorder, #007fd4);')
})
