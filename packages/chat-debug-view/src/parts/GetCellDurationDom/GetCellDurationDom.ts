import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { ChatDebugViewCellDuration, TableCell } from '../ClassNames/ClassNames.ts'
import { getEventTableDurationText } from '../GetEventTableDurationText/GetEventTableDurationText.ts'

const td: VirtualDomNode = {
  childCount: 1,
  className: mergeClassNames(TableCell, ChatDebugViewCellDuration),
  type: VirtualDomElements.Td,
}

export const getCellDurationDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  return [td, text(getEventTableDurationText(event))]
}
