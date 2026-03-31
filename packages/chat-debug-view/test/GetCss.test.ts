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