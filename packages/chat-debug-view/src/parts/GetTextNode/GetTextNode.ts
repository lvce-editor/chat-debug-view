import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { TokenText } from '../ClassNames/ClassNames.ts'
import { getEditorDom } from '../GetEditorDom/GetEditorDom.ts'
import { type LineData } from './LineData/LineData.ts'

export const getTextNode = (value: string, showLineNumbers = true): readonly VirtualDomNode[] => {
  const lines = value.split('\n')
  const lineData: readonly LineData[] = lines.map((line): LineData => {
    return {
      childCount: 2,
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
  return getEditorDom(lineData, showLineNumbers)
}
