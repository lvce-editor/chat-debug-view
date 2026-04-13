import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEventLineNumber, Gutter, Row } from '../../../ClassNames/ClassNames.ts'
import { type LineData } from '../LineData/LineData.ts'

export const getGutterDom = (lineData: readonly LineData[]): readonly VirtualDomNode[] => {
  const gutterNodes = lineData.flatMap((_, index) => {
    return [
      {
        childCount: 1,
        className: Row,
        type: VirtualDomElements.Div,
      },
      {
        childCount: 1,
        className: ChatDebugViewEventLineNumber,
        type: VirtualDomElements.Span,
      },
      text(String(index + 1)),
    ]
  })
  return [
    {
      childCount: lineData.length,
      className: Gutter,
      type: VirtualDomElements.Div,
    },
    ...gutterNodes,
  ]
}
