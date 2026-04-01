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
  expect(css).toContain('.ChatDebugViewTable {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  flex: 1 1 auto;\n}')
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

test('getCss should size devtools columns with dedicated flex classes', () => {
  const css = GetCss.getCss()

  expect(css).toContain('.ChatDebugViewCellType {\n  flex: 1 1 140px;\n  min-width: 0;\n}')
  expect(css).toContain('.ChatDebugViewCellTime {\n  flex: 1 1 180px;\n  min-width: 0;\n}')
  expect(css).not.toContain('.ChatDebugViewTableHeader > :nth-child(1),')
  expect(css).not.toContain('.ChatDebugViewTableHeader > :nth-child(2),')
})

test('getCss should use strict containment for scrollable detail sections', () => {
  const css = GetCss.getCss()

  expect(css).toContain('.ChatDebugViewTableBody {\n  overflow: auto;\n  min-height: 0;\n  flex: 1 1 auto;\n  contain: strict;\n}')
  expect(css).toContain('.ChatDebugViewDetailsBody {\n  overflow: auto;\n  padding: 8px;\n  flex: 1 1 auto;\n  min-height: 0;\n  contain: strict;\n}')
})

test('getCss should use a visible foreground color for the details close button', () => {
  const css = GetCss.getCss()

  expect(css).toContain(
    '.ChatDebugViewDetailsClose {\n  width: 18px;\n  height: 18px;\n  appearance: none;\n  border: 1px solid var(--vscode-editorWidget-border, #454545);\n  border-radius: 4px;\n  cursor: pointer;\n  position: relative;\n  color: var(--vscode-foreground, #cccccc);\n  background: transparent;\n}',
  )
  expect(css).toContain('.ChatDebugViewDetailsClose:hover {\n  background: var(--vscode-toolbar-hoverBackground, rgba(90, 93, 94, 0.31));\n}')
})
