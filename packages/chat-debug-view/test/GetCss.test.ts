import { expect, test } from '@jest/globals'
import * as GetCss from '../src/parts/GetCss/GetCss.ts'

test('getCss should not make devtools type cells bold', () => {
  const css = GetCss.getCss()

  expect(css).not.toContain('.ChatDebugViewCellType {\n  font-weight: 600;\n}')
})

test('getCss should tighten vertical spacing in devtools layout', () => {
  const css = GetCss.getCss()

  expect(css).toContain('.ChatDebugView--devtools {\n  gap: 4px;\n}')
})

test('getCss should avoid nested scrolling in devtools events table', () => {
  const css = GetCss.getCss()

  expect(css).toContain(
    '.ChatDebugView--devtools .ChatDebugViewEvents {\n  border: 1px solid var(--vscode-editorWidget-border, #454545);\n  border-radius: 6px;\n  margin-bottom: 0;\n  overflow: hidden;\n}',
  )
})

test('getCss should keep the details preview in the right devtools column', () => {
  const css = GetCss.getCss()

  expect(css).toContain('.ChatDebugViewDevtoolsMain {\n  display: flex;')
  expect(css).toContain('.ChatDebugViewDevtoolsMain > .ChatDebugViewDetails {\n  flex: 0 0 clamp(320px, 32vw, 420px);\n}')
})

test('getCss should use flex layout for timeline buckets and table rows', () => {
  const css = GetCss.getCss()

  expect(css).toContain('.ChatDebugViewTimelineBuckets {\n  display: flex;')
  expect(css).toContain('.ChatDebugViewTableHeader,\n.ChatDebugViewEventRow {\n  display: flex;')
  expect(css).not.toContain('display: grid;')
})

test('getCss should use strict containment for scrollable detail sections', () => {
  const css = GetCss.getCss()

  expect(css).toContain('.ChatDebugViewTableBody {\n  overflow: auto;\n  min-height: 0;\n  flex: 1 1 auto;\n  contain: strict;\n}')
  expect(css).toContain('.ChatDebugViewDetailsBody {\n  overflow: auto;\n  padding: 8px;\n  flex: 1 1 auto;\n  min-height: 0;\n  contain: strict;\n}')
})
