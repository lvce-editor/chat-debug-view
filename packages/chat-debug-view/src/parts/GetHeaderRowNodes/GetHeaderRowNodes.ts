import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import {
  ChatDebugViewHeadersCell,
  ChatDebugViewHeadersCellName,
  ChatDebugViewHeadersCellValue,
  ChatDebugViewHeadersRow,
  ChatDebugViewHeadersRowEven,
  ChatDebugViewHeadersRowOdd,
} from '../ClassNames/ClassNames.ts'
import { getHeaderValueText } from '../GetHeaderValueText/GetHeaderValueText.ts'

export const getHeaderRowNodes = (headerName: string, headerValue: unknown, index: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: mergeClassNames(ChatDebugViewHeadersRow, index % 2 === 0 ? ChatDebugViewHeadersRowOdd : ChatDebugViewHeadersRowEven),
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      className: mergeClassNames(ChatDebugViewHeadersCell, ChatDebugViewHeadersCellName),
      type: VirtualDomElements.Div,
    },
    text(headerName),
    {
      childCount: 1,
      className: mergeClassNames(ChatDebugViewHeadersCell, ChatDebugViewHeadersCellValue),
      type: VirtualDomElements.Div,
    },
    text(getHeaderValueText(headerValue)),
  ]
}