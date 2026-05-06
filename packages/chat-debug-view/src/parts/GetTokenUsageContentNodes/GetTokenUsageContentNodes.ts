import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getTokenUsageDetailsDom } from '../GetTokenUsageDetailsDom/GetTokenUsageDetailsDom.ts'

export const getTokenUsageContentNodes = (
  responseEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
): readonly VirtualDomNode[] => {
  if (selectedEvent === null) {
    return responseEventNodes
  }
  return getTokenUsageDetailsDom(selectedEvent)
}
