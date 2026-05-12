import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { ChatDebugViewCellDuration, TableCell } from '../ClassNames/ClassNames.ts'
import { getEventTableDurationText } from '../GetEventTableDurationText/GetEventTableDurationText.ts'

export const getCellDurationDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: mergeClassNames(TableCell, ChatDebugViewCellDuration),
      type: VirtualDomElements.Td,
    },
    text(getEventTableDurationText(event)),
  ]
}
