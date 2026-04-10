import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEvent, ChatDebugViewEventRawText, TokenText } from '../ClassNames/ClassNames.ts'
import { getLineNodes } from '../GetLineNodes/GetLineNodes.ts'

export const getTextNode = (value: string, showLineNumbers = true): readonly VirtualDomNode[] => {
  if (!showLineNumbers) {
    return [
      {
        childCount: 1,
        className: `${ChatDebugViewEvent} ${ChatDebugViewEventRawText}`,
        style: 'overflow:auto;',
        type: VirtualDomElements.Div,
      },
      text(value),
    ]
  }
  const lines = value.split('\n')
  const lineData = lines.map((line) => {
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
  })
  const lineNodes = getLineNodes(lineData)
  return [
    {
      childCount: lines.length,
      className: ChatDebugViewEvent,
      style: 'overflow:auto;',
      type: VirtualDomElements.Div,
    },
    ...lineNodes,
  ]
}
