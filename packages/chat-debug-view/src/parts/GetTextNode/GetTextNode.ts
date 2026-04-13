import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { LineData } from './LineData/LineData.ts'
import { TokenText } from '../ClassNames/ClassNames.ts'
import { getEditorDom } from '../GetEditorDom/GetEditorDom.ts'

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
