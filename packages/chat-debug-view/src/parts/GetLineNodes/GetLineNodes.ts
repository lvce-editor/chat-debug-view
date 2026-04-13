import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEventLineContent, ChatDebugViewEventLineNumber, Row } from '../ClassNames/ClassNames.ts'

interface LineNodeData {
  readonly childCount: number
  readonly nodes: readonly VirtualDomNode[]
}

export const getLineNodeDom = (line: LineNodeData, index: number, showLineNumbers = true): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: Row,
      type: VirtualDomElements.Div,
    },
    ...(showLineNumbers
      ? [
          {
            childCount: 1,
            className: ChatDebugViewEventLineNumber,
            type: VirtualDomElements.Span,
          },
          text(String(index + 1)),
        ]
      : []),
    {
      childCount: line.childCount,
      className: ChatDebugViewEventLineContent,
      type: VirtualDomElements.Span,
    },
    ...line.nodes,
  ]
}

export const getLineNodes = (lines: readonly LineNodeData[], showLineNumbers = true): readonly VirtualDomNode[] => {
  return lines.flatMap((line, index) => {
    return getLineNodeDom(line, index, showLineNumbers)
  })
}
