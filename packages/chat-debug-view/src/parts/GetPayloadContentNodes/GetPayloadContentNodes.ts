import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'

export const getPayloadContentNodes = (
  payloadEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
): readonly VirtualDomNode[] => {
  if (payloadEventNodes.length > 0) {
    return payloadEventNodes
  }
  if (selectedEvent === null) {
    return []
  }
  return getEventNode(getPayloadEvent(selectedEvent))
}
