import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { PreviewTextCursor } from '../PreviewTextCursor/PreviewTextCursor.ts'
import type { LineData } from './LineData/LineData.ts'
import { TokenText } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getEditorDom } from '../GetEditorDom/GetEditorDom.ts'

export const getTextNode = (value: string, showLineNumbers = true, cursor: PreviewTextCursor | null = null): readonly VirtualDomNode[] => {
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
  return getEditorDom(lineData, showLineNumbers, cursor, showLineNumbers ? DomEventListenerFunctions.HandlePreviewTextPointerDown : undefined)
}
