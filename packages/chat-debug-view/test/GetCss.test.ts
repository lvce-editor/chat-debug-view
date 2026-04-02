import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getCss should use default cursor for event rows', () => {
  const css = getCss(createDefaultState())

  expect(css).toContain(`.ChatDebugViewEventRow {
  padding: 2px 8px;
  border-bottom: 1px solid var(--vscode-editorWidget-border, #454545);
  cursor: default;
}`)
})
