import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { EditorRow, EditorRows } from '../src/parts/ClassNames/ClassNames.ts'
import { getEditorRowsDom } from '../src/parts/GetEditorRowsDom/GetEditorRowsDom.ts'
import type { LineData } from '../src/parts/GetTextNode/LineData/LineData.ts'

test('getEditorRowsDom should render each line inside the rows container', () => {
  const lineData: readonly LineData[] = [
    {
      childCount: 1,
      nodes: [text('first')],
    },
    {
      childCount: 1,
      nodes: [text('second')],
    },
  ]

  const result = getEditorRowsDom(lineData)

  expect(result).toEqual([
    {
      childCount: 2,
      className: EditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: EditorRow,
      type: VirtualDomElements.Div,
    },
    text('first'),
    {
      childCount: 1,
      className: EditorRow,
      type: VirtualDomElements.Div,
    },
    text('second'),
  ])
})
