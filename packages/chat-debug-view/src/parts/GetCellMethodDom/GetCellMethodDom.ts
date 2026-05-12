import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { TableCell } from '../ClassNames/ClassNames.ts'
import { getEventTableMethodLabel } from '../GetEventTableMethodLabel/GetEventTableMethodLabel.ts'

const td: VirtualDomNode = {
  childCount: 1,
  className: TableCell,
  type: VirtualDomElements.Td,
}

export const getCellMethodDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  return [td, text(getEventTableMethodLabel(event))]
}
