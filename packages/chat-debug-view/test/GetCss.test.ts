import { expect, test } from '@jest/globals'
import * as GetCss from '../src/parts/GetCss/GetCss.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

const selectorEscapeRegex = /[.*+?^${}()|[\]\\]/g
const strictContainmentRegex = /contain: strict;/g
const contentContainmentRegex = /contain: content;/g

const getCss = (): string => {
  return GetCss.getCss({
    ...createDefaultState(),
    tableWidth: 480,
    width: 900,
  })
}

const getRule = (css: string, selector: string): string => {
  const escapedSelector = selector.replaceAll(selectorEscapeRegex, '\\$&')
  const match = css.match(new RegExp(`(?:^|\\n)${escapedSelector} \\{[\\s\\S]*?\\n\\}`, 'm'))
  expect(match).not.toBeNull()
  return match?.[0] || ''
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

  expect(css).toContain('.ChatDebugViewFilterInput {\n  flex: 1;\n  min-width: 0;\n  max-width: 500px;\n  contain: content;\n}')
  expect(css).toContain('.ChatDebugViewFilterInput--devtools {\n  flex: 0 1 80px;\n  width: 100%;\n  max-width: 80px;\n}')
})

test('getCss should keep devtools quick filter pills next to the filter input', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewTop--devtools {\n  align-items: stretch;\n}')
  expect(css).not.toContain('.ChatDebugViewTop--devtools {\n  justify-content: space-between;\n}')
  expect(css).not.toContain('.ChatDebugViewTop--devtools .ChatDebugViewQuickFilters {\n  margin-left: auto;\n}')
})

test('getCss should avoid nested scrolling in devtools events table', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugView--devtools .ChatDebugViewEvents {\n  border-radius: 6px;\n  margin-bottom: 0;\n  overflow: hidden;\n}')
  expect(css).toContain(
    '.ChatDebugViewTable {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  flex: 1 1 auto;\n  contain: strict;\n}',
  )
})

test('getCss should keep the details preview in the right devtools column', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewDevtoolsMain {\n  display: flex;')
  expect(css).toContain('.ChatDebugViewDevtoolsSplit {\n  display: flex;')
  expect(css).toContain('--ChatDebugViewTableWidth: 480px;')
  expect(css).toContain('--ChatDebugViewDetailsWidth: 396px;')
  expect(css).toContain('.ChatDebugViewDevtoolsSplit > .ChatDebugViewEvents {\n  flex: 0 1 var(--ChatDebugViewTableWidth);\n  min-width: 0;\n}')
  expect(css).toContain(
    '.ChatDebugViewDevtoolsSplit > .ChatDebugViewDetails {\n  flex: 0 0 var(--ChatDebugViewDetailsWidth);\n  border-left: 0;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}',
  )
  expect(css).toContain('.ChatDebugViewDevtoolsMain > .ChatDebugViewTimeline {\n  flex: 0 0 auto;\n}')
})

test('getCss should place the details close button before the title', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewDetailsTop {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n')
})

test('getCss should use flex layout for timeline buckets and table rows', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewTimelineBuckets {\n  display: flex;')
  expect(css).toContain('.ChatDebugViewTableHeaderRow,\n.ChatDebugViewEventRow {\n  display: flex;')
  expect(css).toContain('.ChatDebugViewHeaderCell {\n  display: flex;\n  align-items: center;\n  overflow: hidden;')
  expect(css).not.toContain('display: grid;')
})

test('getCss should use compact devtools table row padding', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewTableHeader {\n  padding: 3px 8px;\n')
  expect(css).toContain('.ChatDebugViewEventRow {\n  padding: 2px 8px;\n')
  expect(css).toContain(
    '.ChatDebugViewEventRow:hover {\n  background: var(--vscode-list-hoverBackground, rgba(90, 93, 94, 0.31));\n  color: var(--vscode-list-hoverForeground, inherit);\n}',
  )
})

test('getCss should size devtools columns with dedicated flex classes', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewCellType {\n  flex: 1 1 140px;\n  min-width: 0;\n}')
  expect(css).toContain('.ChatDebugViewCellTime {\n  flex: 1 1 180px;\n  min-width: 0;\n}')
  expect(css).not.toContain('.ChatDebugViewTableHeader > :nth-child(1),')
  expect(css).not.toContain('.ChatDebugViewTableHeader > :nth-child(2),')
})

test('getCss should use strict containment for scrollable detail sections', () => {
  const css = getCss()

  expect(css).toContain(
    '.ChatDebugViewTableBody {\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  min-height: 0;\n  flex: 1 1 auto;\n  contain: strict;\n}',
  )
  expect(css).toContain(
    '.ChatDebugViewDetailsBody {\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  padding: 8px;\n  flex: 1 1 auto;\n  min-height: 0;\n  align-items: flex-start;\n  contain: strict;\n}',
  )
  expect(css).toContain('.ChatDebugViewDetailsBody > .ChatDebugViewEvent {\n  border: 0;\n  border-radius: 0;\n  margin-bottom: 0;\n}')
})

test('getCss should keep details preview rows on a single line with horizontal scrolling', () => {
  const css = getCss()

  expect(css).toContain(
    '.ChatDebugViewEvent {\n  display: flex;\n  flex-direction: column;\n  width: max-content;\n  min-width: 100%;\n  margin: 0;\n  padding: 8px;\n  border: 1px solid var(--vscode-editorWidget-border, #454545);\n  border-radius: 6px;\n  margin-bottom: 8px;\n  white-space: nowrap;\n  font-family: var(--vscode-editor-font-family, monospace);\n  font-size: 12px;\n  user-select: text;\n  contain: content;\n}',
  )
  expect(css).toContain(
    '.row {\n  display: flex;\n  align-items: baseline;\n  min-width: 100%;\n  width: max-content;\n  white-space: nowrap;\n  contain: content;\n}',
  )
  expect(css).toContain(
    '.ChatDebugViewEventLineNumber {\n  display: inline-flex;\n  justify-content: flex-end;\n  flex: 0 0 3ch;\n  margin-right: 12px;\n  opacity: 0.6;\n  user-select: none;\n  contain: content;\n}',
  )
  expect(css).toContain('.ChatDebugViewEventLineContent {\n  display: inline-flex;\n  white-space: pre;\n  contain: content;\n}')
})

test('getCss should keep table cells and messages on flex layouts', () => {
  const css = getCss()

  expect(css).toContain(
    '.ChatDebugViewCell {\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n  contain: content;\n}',
  )
  expect(css).toContain('.ChatDebugViewCellDuration {\n  flex: 0 0 90px;\n  justify-content: flex-end;\n  text-align: right;\n}')
  expect(css).toContain('.ChatDebugViewCellStatus {\n  flex: 0 0 64px;\n  justify-content: flex-end;\n  text-align: right;\n}')
  expect(css).toContain('.ChatDebugViewDetailsTitle {\n  display: flex;\n  align-items: center;\n  font-size: 12px;')
  expect(css).toContain('.ChatDebugViewEmpty {\n  display: flex;\n  align-items: center;\n  opacity: 0.8;\n  contain: content;\n}')
  expect(css).toContain(
    '.ChatDebugViewError {\n  display: flex;\n  color: var(--vscode-errorForeground, #f14c4c);\n  white-space: normal;\n  contain: content;\n}',
  )
})

test('getCss should use a visible foreground color for the details close button', () => {
  const css = getCss()

  expect(css).toContain(
    '.ChatDebugViewDetailsClose {\n  width: 18px;\n  height: 18px;\n  appearance: none;\n  border: 1px solid var(--vscode-editorWidget-border, #454545);\n  border-radius: 4px;\n  cursor: pointer;\n  position: relative;\n  color: var(--vscode-foreground, #cccccc);\n  background: transparent;\n  contain: strict;\n}',
  )
  expect(css).toContain('.ChatDebugViewDetailsClose:hover {\n  background: var(--vscode-toolbar-hoverBackground, rgba(90, 93, 94, 0.31));\n}')
})

test('getCss should render quick filter pills as rounded segmented controls', () => {
  const css = getCss()

  expect(css).toContain(
    '.ChatDebugViewQuickFilters {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  justify-content: center;\n  min-height: 28px;\n  font-size: 12px;\n  line-height: 1;\n  contain: content;\n}',
  )
  expect(css).toContain(
    '.ChatDebugViewQuickFilterPill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 22px;\n  padding: 0 10px;\n  border: 1px solid var(--vscode-editorWidget-border, #454545);\n  border-radius: 999px;\n  cursor: pointer;\n  white-space: nowrap;\n  contain: content;\n}',
  )
  expect(css).toContain(
    '.ChatDebugViewQuickFilterPillSelected {\n  border-color: var(--vscode-focusBorder, #007fd4);\n  background: var(--vscode-list-activeSelectionBackground, rgba(14, 99, 156, 0.35));\n  color: var(--vscode-list-activeSelectionForeground, inherit);\n}',
  )
})

test('getCss should style the split sash between table and details', () => {
  const css = getCss()

  expect(css).toContain('.ChatDebugViewSash {\n  flex: 0 0 var(--ChatDebugViewSashWidth);')
  expect(css).toContain(
    '.ChatDebugViewSashLine {\n  width: 1px;\n  height: 100%;\n  background: var(--vscode-editorWidget-border, #454545);\n  pointer-events: none;\n  contain: strict;\n}',
  )
  expect(css).toContain('.ChatDebugViewSash:hover .ChatDebugViewSashLine {\n  background: var(--vscode-focusBorder, #007fd4);\n}')
  expect(css).not.toContain('.ChatDebugViewSash::before')
})

test('getCss should use strict containment for externally sized containers', () => {
  const css = getCss()

  expect(getRule(css, '.ChatDebugView')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewEvents')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewDevtoolsMain')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewDevtoolsSplit')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewSash')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewTable')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewTimelineBuckets')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewTimelineInteractive')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewTimelineBucket')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewTimelineBucketBar')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewTimelineBucketUnit')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewDetails')).toContain('contain: strict;')
  expect(getRule(css, '.ChatDebugViewDetailsClose')).toContain('contain: strict;')
  expect((css.match(strictContainmentRegex) || []).length).toBeGreaterThanOrEqual(12)
})

test('getCss should use content containment for auto-sized text containers', () => {
  const css = getCss()

  expect(getRule(css, '.ChatDebugViewTop')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewToggle')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewQuickFilters')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewQuickFilterPill')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewTimeline')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewTimelineTop')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewTableHeader')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewHeaderCell')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewEventRow')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewCell')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewDetailsTop')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewDetailsTitle')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewEvent')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewEmpty')).toContain('contain: content;')
  expect(getRule(css, '.ChatDebugViewError')).toContain('contain: content;')
  expect((css.match(contentContainmentRegex) || []).length).toBeGreaterThanOrEqual(12)
})

test('getCss should keep the timeline compact without a title row', () => {
  const css = getCss()

  expect(getRule(css, '.ChatDebugViewTimeline')).toContain('gap: 6px;')
  expect(getRule(css, '.ChatDebugViewTimeline')).toContain('padding: 6px 10px 8px;')
  expect(getRule(css, '.ChatDebugViewTimelineSummary')).toContain('line-height: 16px;')
  expect(getRule(css, '.ChatDebugViewTimelineInteractive')).toContain('min-height: 52px;')
  expect(css).not.toContain('.ChatDebugViewTimelineTitle {')
})
