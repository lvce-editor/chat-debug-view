import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getTimingDetailsDom } from '../GetTimingDetailsDom/GetTimingDetailsDom.ts'

export const getTimingContentNodes = (
  responseEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
): readonly VirtualDomNode[] => {
  if (selectedEvent === null) {
    return responseEventNodes
  }
  return getTimingDetailsDom(selectedEvent)
}
