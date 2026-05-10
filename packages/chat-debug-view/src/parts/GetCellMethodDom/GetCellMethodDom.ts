import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { TableCell } from '../ClassNames/ClassNames.ts'
import { getEventTableMethodLabel } from '../GetEventTableMethodLabel/GetEventTableMethodLabel.ts'

export const getCellMethodDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: TableCell,
      type: VirtualDomElements.Td,
    },
    text(getEventTableMethodLabel(event)),
  ]
}
