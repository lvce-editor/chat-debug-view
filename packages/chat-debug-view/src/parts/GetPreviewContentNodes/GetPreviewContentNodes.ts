import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { TextNodeVirtualizationOptions } from '../GetTextNode/GetTextNode.ts'
import { getPreviewEvent } from '../GetPreviewEvent/GetPreviewEvent.ts'
import { getPreviewEventNodes } from '../GetPreviewEventNodes/GetPreviewEventNodes.ts'

export const getPreviewContentNodes = (
  previewEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
  previewTextCursorRowIndex: number | null,
  previewTextCursorColumnIndex: number | null,
  virtualization?: TextNodeVirtualizationOptions,
): readonly VirtualDomNode[] => {
  if (previewEventNodes.length > 0) {
    return previewEventNodes
  }
  if (selectedEvent === null) {
    return []
  }
  return getPreviewEventNodes(
    getPreviewEvent(selectedEvent),
    selectedEvent,
    previewTextCursorRowIndex === null || previewTextCursorColumnIndex === null
      ? null
      : {
          columnIndex: previewTextCursorColumnIndex,
          rowIndex: previewTextCursorRowIndex,
        },
    virtualization,
  )
}
