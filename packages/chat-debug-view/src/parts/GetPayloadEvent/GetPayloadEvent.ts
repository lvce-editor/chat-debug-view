import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getPreviewName } from '../GetPreviewName/GetPreviewName.ts'
import { hasOwn } from '../HasOwn/HasOwn.ts'
import { shouldIncludeArguments } from '../ShouldIncludeArguments/ShouldIncludeArguments.ts'

export const getPayloadEvent = (event: ChatViewEvent): unknown => {
  const { requestEvent } = event as {
    readonly requestEvent?: unknown
  }
  if (requestEvent && typeof requestEvent === 'object' && typeof (requestEvent as ChatViewEvent).type === 'string') {
    const mergedRequestEvent = requestEvent as ChatViewEvent & {
      readonly body?: unknown
      readonly value?: unknown
    }
    if (mergedRequestEvent.body !== undefined) {
      return mergedRequestEvent.body
    }
    if (mergedRequestEvent.value !== undefined) {
      return mergedRequestEvent.value
    }
    if (hasOwn(mergedRequestEvent, 'arguments')) {
      return mergedRequestEvent.arguments
    }
    return requestEvent
  }
  const name = getPreviewName(event)
  if (name === 'list_files' && hasOwn(event, 'arguments')) {
    return event.arguments
  }
  const payloadEvent = {
    ...(name === undefined ? {} : { name }),
    ...(shouldIncludeArguments(event, name) ? { arguments: event.arguments } : {}),
    ...(hasOwn(event, 'result') ? { result: event.result } : {}),
  }
  if (Object.keys(payloadEvent).length > 0) {
    return payloadEvent
  }
  return event
}
