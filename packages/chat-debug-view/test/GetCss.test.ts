import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getCss should wrap preview message lines', () => {
  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })

  expect(css).toContain('.ChatDebugViewEventLineContent')
  expect(css).toContain('white-space: pre-wrap;')
  expect(css).toContain('overflow-wrap: anywhere;')
})

test('getCss should align the refresh button with the top row and use toolbar styling', () => {
  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })

  expect(css).toContain('.ChatDebugViewTop')
  expect(css).toContain('display: flex;')
  expect(css).toContain('.ChatDebugViewRefreshButton')
  expect(css).toContain('margin-left: auto;')
  expect(css).toContain('background: var(--vscode-toolbar-hoverBackground, rgba(255, 255, 255, 0.06));')
})

test('getCss should expose table column width and resizer position variables', () => {
  const css = getCss({
    ...createDefaultState(),
    tableColumnWidths: {
      duration: 96,
      status: 124,
      type: 240,
    },
    tableWidth: 460,
    visibleTableColumns: ['type', 'duration', 'status'],
    width: 960,
  })

  expect(css).toContain('--ChatDebugViewTypeColumnWidth: 240px;')
  expect(css).toContain('--ChatDebugViewDurationColumnWidth: 96px;')
  expect(css).toContain('--ChatDebugViewResizerOneLeft: 240px;')
  expect(css).toContain('--ChatDebugViewResizerTwoLeft: 336px;')
  expect(css).toContain('.ChatDebugViewResizers')
})
