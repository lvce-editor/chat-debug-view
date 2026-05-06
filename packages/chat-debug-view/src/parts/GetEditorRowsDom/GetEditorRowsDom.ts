import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { EditorRows } from '../ClassNames/ClassNames.ts'
import { getEditorRowDom } from '../GetEditorRowDom/GetEditorRowDom.ts'
import type { LineData } from '../GetTextNode/LineData/LineData.ts'

export const getEditorRowsDom = (lineData: readonly LineData[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: lineData.length,
      className: EditorRows,
      type: VirtualDomElements.Div,
    },
    ...lineData.flatMap(getEditorRowDom),
  ]
}
