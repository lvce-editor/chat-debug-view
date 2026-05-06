import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { EditorSelection, EditorSelections } from '../ClassNames/ClassNames.ts'
import type { PreviewTextCursor } from '../PreviewTextCursor/PreviewTextCursor.ts'
import { getPreviewTextCursorStyle } from '../PreviewTextCursor/PreviewTextCursor.ts'

const defaultEditorCursor: PreviewTextCursor = {
  columnIndex: 0,
  rowIndex: 1,
}

export const getEditorSelectionDom = (cursor: PreviewTextCursor | null = defaultEditorCursor): readonly VirtualDomNode[] => {
  const hasCursor = cursor !== null
  return [
    {
      childCount: hasCursor ? 1 : 0,
      className: EditorSelections,
      type: VirtualDomElements.Div,
    },
    ...(hasCursor
      ? [
          {
            childCount: 0,
            className: EditorSelection,
            style: getPreviewTextCursorStyle(cursor),
            type: VirtualDomElements.Div,
          },
        ]
      : []),
  ]
}
