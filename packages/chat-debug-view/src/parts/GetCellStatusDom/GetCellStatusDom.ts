import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { ChatDebugViewCellStatusError, TableCell } from '../ClassNames/ClassNames.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'

export const getCellStatusDom = (event: ChatViewEvent, isErrorStatus: boolean): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: mergeClassNames(TableCell, isErrorStatus ? ChatDebugViewCellStatusError : ''),
      type: VirtualDomElements.Td,
    },
    text(getStatusText(event)),
  ]
}
