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

  expect(css).toContain(".ChatDebugViewDevtoolsMain {\n  display: grid;\n  grid-template-areas: 'table details';")
  expect(css).toContain('.ChatDebugViewDevtoolsMain > .ChatDebugViewDetails {\n  grid-area: details;\n}')
})
