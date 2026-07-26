import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEventLineContent, ChatDebugViewEventLineNumber, Row } from '../ClassNames/ClassNames.ts'

const lineNode: VirtualDomNode = {
  childCount: 1,
  className: ChatDebugViewEventLineNumber,
  type: VirtualDomElements.Span,
}

interface LineNodeData {
  readonly childCount: number
  readonly nodes: readonly VirtualDomNode[]
}

const getLineNumberNodes = (index: number, showLineNumbers: boolean): readonly VirtualDomNode[] => {
  if (!showLineNumbers) {
    return []
  }
  return [lineNode, text(String(index + 1))]
}

export const getLineNodeDom = (line: LineNodeData, index: number, showLineNumbers = true): readonly VirtualDomNode[] => {
  const lineNumberNodes = getLineNumberNodes(index, showLineNumbers)
  return [
    {
      childCount: showLineNumbers ? 2 : 1,
      className: Row,
      type: VirtualDomElements.Div,
    },
    ...lineNumberNodes,
    {
      childCount: line.childCount,
      className: ChatDebugViewEventLineContent,
      type: VirtualDomElements.Pre,
    },
    ...line.nodes,
  ]
}

export const getLineNodes = (lines: readonly LineNodeData[], showLineNumbers = true): readonly VirtualDomNode[] => {
  return lines.flatMap((line, index) => {
    return getLineNodeDom(line, index, showLineNumbers)
  })
}
