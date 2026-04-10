import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEventLineContent, ChatDebugViewEventLineNumber, Row } from '../ClassNames/ClassNames.ts'

interface LineNodeData {
  readonly childCount: number
  readonly nodes: readonly VirtualDomNode[]
}

export const getLineNodes = (lines: readonly LineNodeData[]): readonly VirtualDomNode[] => {
  return lines.flatMap((line, index) => {
    return [
      {
        childCount: 2,
        className: Row,
        type: VirtualDomElements.Div,
      },
      {
        childCount: 1,
        className: ChatDebugViewEventLineNumber,
        type: VirtualDomElements.Span,
      },
      text(String(index + 1)),
      {
        childCount: line.childCount,
        className: ChatDebugViewEventLineContent,
        type: VirtualDomElements.Span,
      },
      ...line.nodes,
    ]
  })
}
