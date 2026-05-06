import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { EditorRow } from '../src/parts/ClassNames/ClassNames.ts'
import { getEditorRowDom } from '../src/parts/GetEditorRowDom/GetEditorRowDom.ts'

test('getEditorRowDom should wrap the line nodes in an editor row', () => {
  const result = getEditorRowDom({
    childCount: 2,
    nodes: [text('alpha'), text('beta')],
  })

  expect(result).toEqual([
    {
      childCount: 2,
      className: EditorRow,
      type: VirtualDomElements.Div,
    },
    text('alpha'),
    text('beta'),
  ])
})
