import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEventRawText, ChatDebugViewEventText, TokenText } from '../ClassNames/ClassNames.ts'
import { getGutterDom } from './GetGutterDom/GetGutterDom.ts'
import { getLinesDom } from './GetLinesDom/GetLinesDom.ts'
import { type LineData } from './LineData/LineData.ts'

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
  return [
    {
      childCount: 2,
      className: ChatDebugViewEventText,
      type: VirtualDomElements.Div,
    },
    ...getGutterDom(lineData),
    ...getLinesDom(lineData),
  ]
}
