import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { ChatDebugViewCellSize, TableCell } from '../ClassNames/ClassNames.ts'
import { formatBytes } from '../FormatBytes/FormatBytes.ts'

const td: VirtualDomNode = {
  childCount: 1,
  className: mergeClassNames(TableCell, ChatDebugViewCellSize),
  type: VirtualDomElements.Td,
}

export const getCellSizeDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  return [td, text(formatBytes(event.size ?? 0))]
}
