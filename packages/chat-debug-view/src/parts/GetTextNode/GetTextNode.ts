import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEvent, ChatDebugViewEventLineContent, ChatDebugViewEventLineNumber, Row, TokenText } from '../ClassNames/ClassNames.ts'

const getLineNodes = (lines: readonly string[]): readonly VirtualDomNode[] => {
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
        childCount: 1,
        className: ChatDebugViewEventLineContent,
        type: VirtualDomElements.Span,
      },
      {
        childCount: 1,
        className: TokenText,
        type: VirtualDomElements.Span,
      },
      text(line),
    ]
  })
}

export const getTextNode = (value: string): readonly VirtualDomNode[] => {
  const lines = value.split('\n')
  const lineNodes = getLineNodes(lines)
  return [
    {
      childCount: lines.length,
      className: ChatDebugViewEvent,
      type: VirtualDomElements.Div,
    },
    ...lineNodes,
  ]
}
