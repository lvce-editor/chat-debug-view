import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEventLineNumber, Gutter } from '../../ClassNames/ClassNames.ts'
import { type LineData } from '../LineData/LineData.ts'

const getGutterLineNumberDom = (gutterLineNumber: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ChatDebugViewEventLineNumber,
      type: VirtualDomElements.Span,
    },
    text(gutterLineNumber),
  ]
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
