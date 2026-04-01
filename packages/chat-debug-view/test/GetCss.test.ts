import { expect, test } from '@jest/globals'
import * as GetCss from '../src/parts/GetCss/GetCss.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

const getCss = (): string => {
  return GetCss.getCss({
    ...createDefaultState(),
    tableWidth: 480,
    width: 900,
  })
}

test('getCss should not make devtools type cells bold', () => {
  const css = getCss()

  expect(css).not.toContain('.ChatDebugViewCellType {\n  font-weight: 600;\n}')
})

test('getCss should tighten vertical spacing in devtools layout', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugView--devtools {\n  gap: 4px;\n}')
})

test('getCss should keep the devtools filter input compact', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewFilterInput {\n  flex: 1;\n  min-width: 0;\n}')
  expect(css).toContain('.ChatDebugViewFilterInput--devtools {\n  flex: 0 1 320px;\n  width: 320px;\n  max-width: 100%;\n}')
})

test('getCss should avoid nested scrolling in devtools events table', () => {
  const css = getCss()

  expect(css).toContain(
    '.ChatDebugView--devtools .ChatDebugViewEvents {\n  border: 1px solid var(--vscode-editorWidget-border, #454545);\n  border-radius: 6px;\n  margin-bottom: 0;\n  overflow: auto;\n}',
  )
  expect(css).toContain('.ChatDebugViewTable {\n  width: 100%;\n  border-collapse: collapse;\n  table-layout: fixed;\n}')
})

test('getCss should keep the details preview in the right devtools column', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewDevtoolsMain {\n  display: flex;')
  expect(css).toContain('.ChatDebugViewDevtoolsSplit {\n  display: flex;')
  expect(css).toContain('--ChatDebugViewTableWidth: 480px;')
  expect(css).toContain('--ChatDebugViewDetailsWidth: 396px;')
  expect(css).toContain('.ChatDebugViewDevtoolsSplit > .ChatDebugViewEvents {\n  flex: 0 1 var(--ChatDebugViewTableWidth);\n  min-width: 0;\n}')
  expect(css).toContain('.ChatDebugViewDevtoolsSplit > .ChatDebugViewDetails {\n  flex: 0 0 var(--ChatDebugViewDetailsWidth);\n}')
  expect(css).toContain('.ChatDebugViewDevtoolsMain > .ChatDebugViewTimeline {\n  flex: 0 0 auto;\n}')
})

test('getCss should place the details close button before the title', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewDetailsTop {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n')
})

test('getCss should use flex layout for timeline buckets and table rows', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewTimelineBuckets {\n  display: flex;')
  expect(css).toContain('.ChatDebugViewHeaderCell,\n.ChatDebugViewCell {\n  overflow: hidden;')
  expect(css).not.toContain('display: grid;')
})

test('getCss should use compact devtools table row padding', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewHeaderCell {\n  padding: 3px 8px;\n')
  expect(css).toContain('.ChatDebugViewCell {\n  padding: 2px 8px;\n')
})

test('getCss should size devtools columns with dedicated flex classes', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewCellType {\n  width: auto;\n')
  expect(css).toContain('.ChatDebugViewCellTime {\n  width: 180px;\n')
  expect(css).not.toContain('.ChatDebugViewTableHeader > :nth-child(1),')
  expect(css).not.toContain('.ChatDebugViewTableHeader > :nth-child(2),')
})

test('getCss should use strict containment for scrollable detail sections', () => {
  const css = getCss()

  expect(css).toContain(
    '.ChatDebugViewTableBody {\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  min-height: 0;\n  flex: 1 1 auto;\n  contain: strict;\n}',
  )
  expect(css).toContain(
    '.ChatDebugViewDetailsBody {\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  padding: 8px;\n  flex: 1 1 auto;\n  min-height: 0;\n  contain: strict;\n}',
  )
})

test('getCss should keep table cells and messages on flex layouts', () => {
  const css = getCss()

  expect(css).toContain(
    '.ChatDebugViewCell {\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n}',
  )
  expect(css).toContain('.ChatDebugViewCellDuration {\n  flex: 0 0 90px;\n  justify-content: flex-end;\n  text-align: right;\n}')
  expect(css).toContain('.ChatDebugViewCellStatus {\n  flex: 0 0 64px;\n  justify-content: flex-end;\n  text-align: right;\n}')
  expect(css).toContain('.ChatDebugViewDetailsTitle {\n  display: flex;\n  align-items: center;\n  font-size: 12px;')
  expect(css).toContain('.ChatDebugViewEmpty {\n  display: flex;\n  align-items: center;\n  opacity: 0.8;\n}')
  expect(css).toContain('.ChatDebugViewError {\n  display: flex;\n  color: var(--vscode-errorForeground, #f14c4c);\n  white-space: normal;\n}')
})

test('getCss should use a visible foreground color for the details close button', () => {
  const css = getCss()

  expect(css).toContain(
    '.ChatDebugViewDetailsClose {\n  width: 18px;\n  height: 18px;\n  appearance: none;\n  border: 1px solid var(--vscode-editorWidget-border, #454545);\n  border-radius: 4px;\n  cursor: pointer;\n  position: relative;\n  color: var(--vscode-foreground, #cccccc);\n  background: transparent;\n}',
  )
  expect(css).toContain('.ChatDebugViewDetailsClose:hover {\n  background: var(--vscode-toolbar-hoverBackground, rgba(90, 93, 94, 0.31));\n}')
})

test('getCss should render quick filter pills as rounded segmented controls', () => {
  const css = getCss()

  expect(css).toContain(
    '.ChatDebugViewQuickFilterPill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 22px;\n  padding: 0 10px;\n  border: 1px solid transparent;\n  border-radius: 999px;\n  cursor: pointer;\n  white-space: nowrap;\n}',
  )
  expect(css).toContain(
    '.ChatDebugViewQuickFilterPillSelected {\n  border-color: var(--vscode-focusBorder, #007fd4);\n  background: var(--vscode-list-activeSelectionBackground, rgba(14, 99, 156, 0.35));\n  color: var(--vscode-list-activeSelectionForeground, inherit);\n}',
  )
})

test('getCss should style the split sash between table and details', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewSash {\n  flex: 0 0 var(--ChatDebugViewSashWidth);')
  expect(css).toContain(".ChatDebugViewSash::before {\n  content: '';")
  expect(css).toContain('.ChatDebugViewSash:hover::before {\n  background: var(--vscode-focusBorder, #007fd4);\n}')
  expect(css).not.toContain('.ChatDebugViewSashLine')
})
