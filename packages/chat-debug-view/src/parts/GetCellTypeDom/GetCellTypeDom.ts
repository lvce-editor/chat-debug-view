import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { TableCell } from '../ClassNames/ClassNames.ts'
import { getEventTableTypeLabel } from '../GetEventTableTypeLabel/GetEventTableTypeLabel.ts'

export const getCellTypeDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: TableCell,
      type: VirtualDomElements.Td,
    },
    text(getEventTableTypeLabel(event)),
  ]
}
