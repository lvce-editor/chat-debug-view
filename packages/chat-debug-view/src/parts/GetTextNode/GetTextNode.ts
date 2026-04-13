import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEventRawText, TokenText } from '../ClassNames/ClassNames.ts'
import { getLineNodes } from '../GetLineNodes/GetLineNodes.ts'

export const getTextNode = (value: string, showLineNumbers = true): readonly VirtualDomNode[] => {
  if (!showLineNumbers) {
    return [
      {
        childCount: 1,
        className: ChatDebugViewEventRawText,
        type: VirtualDomElements.P,
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
  const lineNodes = getLineNodes(lineData, true)
  return lineNodes
}
