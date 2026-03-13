import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getJsonTokenNodes } from '../GetJsonTokenNodes/GetJsonTokenNodes.ts'

const getCompactSseResponseCompletedEvent = (event: ChatViewEvent): ChatViewEvent => {
  if (event.type !== 'sse-response-completed') {
    return event
  }
  const rawValue = event.value
  if (!rawValue || typeof rawValue !== 'object') {
    return event
  }
  const value = rawValue as Record<string, unknown>
  const rawResponse = value.response
  if (!rawResponse || typeof rawResponse !== 'object') {
    return event
  }
  const response = rawResponse as Record<string, unknown>
  const compactValue: Record<string, unknown> = {
    response: {
      id: response.id,
      model: response.model,
      output: response.output,
    },
  }
  if ('type' in value) {
    compactValue.type = value.type
  }
  if ('sequence_number' in value) {
    compactValue.sequence_number = value.sequence_number
  }
  return {
    ...event,
    value: compactValue,
  }
}

export const getEventNode = (event: ChatViewEvent, showFullOutput: boolean): readonly VirtualDomNode[] => {
  const displayEvent = showFullOutput ? event : getCompactSseResponseCompletedEvent(event)
  const tokenNodes = getJsonTokenNodes(displayEvent)
  return [
    {
      childCount: tokenNodes.length / 2,
      className: 'ChatDebugViewEvent',
      type: VirtualDomElements.Pre,
    },
    ...tokenNodes,
  ]
}
