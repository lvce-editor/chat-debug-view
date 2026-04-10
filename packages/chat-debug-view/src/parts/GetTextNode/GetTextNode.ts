import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEvent, TokenText } from '../ClassNames/ClassNames.ts'
import { getLineNodes } from '../GetLineNodes/GetLineNodes.ts'

export const getTextNode = (value: string, showLineNumbers = true): readonly VirtualDomNode[] => {
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
  let lineNodes: readonly VirtualDomNode[]
  if (showLineNumbers) {
    lineNodes = getLineNodes(lineData)
  } else {
    const nodes: VirtualDomNode[] = []
    for (const line of lineData) {
      nodes.push(...line.nodes)
    }
    lineNodes = nodes
  }
  return [
    {
      childCount: lines.length,
      className: ChatDebugViewEvent,
      type: VirtualDomElements.Div,
    },
    ...lineNodes,
  ]
}
