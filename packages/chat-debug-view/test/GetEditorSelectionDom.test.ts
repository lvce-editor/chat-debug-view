import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { EditorSelection, EditorSelections } from '../src/parts/ClassNames/ClassNames.ts'
import { getEditorSelectionDom } from '../src/parts/GetEditorSelectionDom/GetEditorSelectionDom.ts'

test('getEditorSelectionDom should render only the selection container when cursor is null', () => {
  const result = getEditorSelectionDom(null)

  expect(result).toEqual([
    {
      childCount: 0,
      className: EditorSelections,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getEditorSelectionDom should render a cursor selection when a cursor is provided', () => {
  const result = getEditorSelectionDom({
    columnIndex: 2,
    rowIndex: 3,
  })

  expect(result).toEqual([
    {
      childCount: 1,
      className: EditorSelections,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: EditorSelection,
      style: 'height: 20px; left: 18px; top: 60px; width: 0px;',
      type: VirtualDomElements.Div,
    },
  ])
})
