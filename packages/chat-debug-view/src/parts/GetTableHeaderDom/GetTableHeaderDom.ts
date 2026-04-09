import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewHeaderCell, ChatDebugViewTableHeader, ChatDebugViewTableHeaderRow } from '../ClassNames/ClassNames.ts'

export const getTableHeaderDom = (): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ChatDebugViewTableHeader,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 3,
      className: ChatDebugViewTableHeaderRow,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: ChatDebugViewHeaderCell,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text(ChatDebugStrings.type()),
    {
      childCount: 1,
      className: ChatDebugViewHeaderCell,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text(ChatDebugStrings.duration()),
    {
      childCount: 1,
      className: ChatDebugViewHeaderCell,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text(ChatDebugStrings.status()),
  ]
}
