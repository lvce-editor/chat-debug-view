import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEvent, TokenText } from '../ClassNames/ClassNames.ts'
import { getLineNodes } from '../GetLineNodes/GetLineNodes.ts'

export const getTextNode = (value: string): readonly VirtualDomNode[] => {
  const lines = value.split('\n')
  const lineNodes = getLineNodes(
    lines.map((line) => {
      return {
        childCount: 1,
        nodes: [
          {
            childCount: 1,
            className: TokenText,
            type: VirtualDomElements.Span,
          },
          text(line),
        ],
      }
    }),
  )
  return [
    {
      childCount: lines.length,
      className: ChatDebugViewEvent,
      type: VirtualDomElements.Div,
    },
    ...lineNodes,
  ]
}
