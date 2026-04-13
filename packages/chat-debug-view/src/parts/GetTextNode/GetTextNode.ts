import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import {
  ChatDebugViewEventLineNumber,
  ChatDebugViewEventRawText,
  ChatDebugViewEventText,
  Gutter,
  Row,
  Rows,
  TokenText,
} from '../ClassNames/ClassNames.ts'
import { getLineNodes } from '../GetLineNodes/GetLineNodes.ts'

type LineData = {
  readonly childCount: number
  readonly nodes: readonly VirtualDomNode[]
}

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
  const lineData: readonly LineData[] = lines.map((line): LineData => {
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
  const gutterNodes = lineData.flatMap((_, index) => {
    return [
      {
        childCount: 1,
        className: Row,
        type: VirtualDomElements.Div,
      },
      {
        childCount: 1,
        className: ChatDebugViewEventLineNumber,
        type: VirtualDomElements.Span,
      },
      text(String(index + 1)),
    ]
  })
  const rowNodes = getLineNodes(lineData, false)
  return [
    {
      childCount: 2,
      className: ChatDebugViewEventText,
      type: VirtualDomElements.Div,
    },
    {
      childCount: lineData.length,
      className: Gutter,
      type: VirtualDomElements.Div,
    },
    ...gutterNodes,
    {
      childCount: lineData.length,
      className: Rows,
      type: VirtualDomElements.Div,
    },
    ...rowNodes,
  ]
}
