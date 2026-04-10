import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getPreviewName } from '../GetPreviewName/GetPreviewName.ts'
import { hasOwn } from '../HasOwn/HasOwn.ts'
import { shouldIncludeArguments } from '../ShouldIncludeArguments/ShouldIncludeArguments.ts'

export const getPayloadEvent = (event: ChatViewEvent): unknown => {
  const name = getPreviewName(event)
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
