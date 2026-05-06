import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { EditorRow } from '../ClassNames/ClassNames.ts'
import type { LineData } from '../GetTextNode/LineData/LineData.ts'

export const getEditorRowDom = (line: LineData): readonly VirtualDomNode[] => {
  return [
    {
      childCount: line.childCount,
      className: EditorRow,
      type: VirtualDomElements.Div,
    },
    ...line.nodes,
  ]
}
