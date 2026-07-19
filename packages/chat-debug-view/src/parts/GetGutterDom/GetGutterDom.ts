import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { LineData } from '../GetTextNode/LineData/LineData.ts'
import { ChatDebugViewEventLineNumber, Gutter } from '../ClassNames/ClassNames.ts'

const gutterNode: VirtualDomNode = {
  childCount: 1,
  className: ChatDebugViewEventLineNumber,
  type: VirtualDomElements.Span,
}

export const getGutterDom = (lineData: readonly LineData[], showLineNumbers: boolean, lineNumberStart = 0): readonly VirtualDomNode[] => {
  const gutterNodes = showLineNumbers
    ? lineData.flatMap((_, index) => {
        return [gutterNode, text(String(lineNumberStart + index + 1))]
      })
    : []
  return [
    {
      childCount: showLineNumbers ? lineData.length : 0,
      className: Gutter,
      type: VirtualDomElements.Div,
    },
    ...gutterNodes,
  ]
}
