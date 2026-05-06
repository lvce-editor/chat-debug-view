import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEventLineNumber, Gutter } from '../ClassNames/ClassNames.ts'
import type { LineData } from '../GetTextNode/LineData/LineData.ts'

export const getGutterDom = (lineData: readonly LineData[], showLineNumbers: boolean, lineNumberStart = 0): readonly VirtualDomNode[] => {
  const gutterNodes = showLineNumbers
    ? lineData.flatMap((_, index) => {
        return [
          {
            childCount: 1,
            className: ChatDebugViewEventLineNumber,
            type: VirtualDomElements.Span,
          },
          text(String(lineNumberStart + index + 1)),
        ]
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
