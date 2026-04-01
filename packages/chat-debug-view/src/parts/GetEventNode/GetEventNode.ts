import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventTypeLabel } from '../GetEventTypeLabel/GetEventTypeLabel.ts'
import { getJsonTokenNodes } from '../GetJsonTokenNodes/GetJsonTokenNodes.ts'

export const getEventNode = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  const renderedEvent = {
    ...event,
    type: getEventTypeLabel(event),
  }
  const tokenNodes = getJsonTokenNodes(renderedEvent)
  return [
    {
      childCount: tokenNodes.length / 2,
      className: 'ChatDebugViewEvent',
      type: VirtualDomElements.Pre,
    },
    ...tokenNodes,
  ]
}
