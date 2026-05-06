import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'

export const getResponseContentNodes = (
  responseEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
): readonly VirtualDomNode[] => {
  if (responseEventNodes.length > 0) {
    return responseEventNodes
  }
  if (selectedEvent === null) {
    return []
  }
  return getEventNode(selectedEvent)
}
