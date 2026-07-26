import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { PreviewTextCursor } from '../PreviewTextCursor/PreviewTextCursor.ts'
import { EditorSelection, EditorSelections } from '../ClassNames/ClassNames.ts'
import { getPreviewTextCursorStyle } from '../PreviewTextCursor/PreviewTextCursor.ts'

const defaultEditorCursor: PreviewTextCursor = {
  columnIndex: 0,
  rowIndex: 1,
}

const getSelectionNodes = (cursor: PreviewTextCursor | null): readonly VirtualDomNode[] => {
  if (cursor === null) {
    return []
  }
  return [
    {
      childCount: 0,
      className: EditorSelection,
      style: getPreviewTextCursorStyle(cursor),
      type: VirtualDomElements.Div,
    },
  ]
}

export const getEditorSelectionDom = (cursor: PreviewTextCursor | null = defaultEditorCursor): readonly VirtualDomNode[] => {
  const selectionNodes = getSelectionNodes(cursor)
  return [
    {
      childCount: selectionNodes.length,
      className: EditorSelections,
      type: VirtualDomElements.Div,
    },
    ...selectionNodes,
  ]
}
