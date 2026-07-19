import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { LineData } from '../LineData/LineData.ts'
import { ChatDebugViewEventLineNumber, Gutter } from '../../ClassNames/ClassNames.ts'

const gutterNode: VirtualDomNode = {
  childCount: 1,
  className: ChatDebugViewEventLineNumber,
  type: VirtualDomElements.Span,
}

const getGutterLineNumberDom = (gutterLineNumber: string): readonly VirtualDomNode[] => {
  return [gutterNode, text(gutterLineNumber)]
}

export const getGutterDom = (lineData: readonly LineData[]): readonly VirtualDomNode[] => {
  const gutterLineNumbers = lineData.map((_, index) => String(index + 1))
  const gutterNodes = gutterLineNumbers.flatMap(getGutterLineNumberDom)
  return [
    {
      childCount: lineData.length,
      className: Gutter,
      type: VirtualDomElements.Div,
    },
    ...gutterNodes,
  ]
}
