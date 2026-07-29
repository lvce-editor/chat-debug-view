import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { HeaderSectionItem } from '../GetVisibleHeaderSections/GetVisibleHeaderSections.ts'
import {
  ChatDebugViewHeadersCell,
  ChatDebugViewHeadersCellName,
  ChatDebugViewHeadersCellValue,
  ChatDebugViewHeadersRow,
  ChatDebugViewHeadersRowEven,
  ChatDebugViewHeadersRowOdd,
} from '../ClassNames/ClassNames.ts'

const headerNameNode: VirtualDomNode = {
  childCount: 1,
  className: mergeClassNames(ChatDebugViewHeadersCell, ChatDebugViewHeadersCellName),
  type: VirtualDomElements.Div,
}

const headerValueNode: VirtualDomNode = {
  childCount: 1,
  className: mergeClassNames(ChatDebugViewHeadersCell, ChatDebugViewHeadersCellValue),
  type: VirtualDomElements.Div,
}

export const getHeaderRowNodes = (item: HeaderSectionItem, index: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: mergeClassNames(ChatDebugViewHeadersRow, index % 2 === 0 ? ChatDebugViewHeadersRowOdd : ChatDebugViewHeadersRowEven),
      type: VirtualDomElements.Li,
    },
    headerNameNode,
    text(item.key),
    headerValueNode,
    text(item.value),
  ]
}
