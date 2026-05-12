import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getPreviewName } from '../GetPreviewName/GetPreviewName.ts'
import { hasOwn } from '../HasOwn/HasOwn.ts'
import { shouldIncludeArguments } from '../ShouldIncludeArguments/ShouldIncludeArguments.ts'

type EventWithRequestEvent = {
  readonly requestEvent?: unknown
}

type MergedRequestEvent = ChatViewEvent & {
  readonly body?: unknown
  readonly value?: unknown
}

type MergedRequestPayloadResult =
  | {
      readonly found: false
    }
  | {
      readonly found: true
      readonly value: unknown
    }

type PayloadEvent = {
  readonly name?: string
  readonly arguments?: unknown
  readonly result?: unknown
}

const getMergedRequestPayloadEvent = (requestEvent: unknown): MergedRequestPayloadResult => {
  if (!requestEvent || typeof requestEvent !== 'object') {
    return { found: false }
  }
  const mergedRequestEvent = requestEvent as MergedRequestEvent
  if (typeof mergedRequestEvent.type !== 'string') {
    return { found: false }
  }
  if (mergedRequestEvent.body !== undefined) {
    return { found: true, value: mergedRequestEvent.body }
  }
  if (mergedRequestEvent.value !== undefined) {
    return { found: true, value: mergedRequestEvent.value }
  }
  if (hasOwn(mergedRequestEvent, 'arguments')) {
    return { found: true, value: mergedRequestEvent.arguments }
  }
  return { found: true, value: requestEvent }
}

const getPayloadObject = (event: ChatViewEvent, name: string | undefined): PayloadEvent => {
  return {
    ...(name === undefined ? {} : { name }),
    ...(shouldIncludeArguments(event, name) ? { arguments: event.arguments } : {}),
    ...(hasOwn(event, 'result') ? { result: event.result } : {}),
  }
}

export const getPayloadEvent = (event: ChatViewEvent): unknown => {
  const { requestEvent } = event as EventWithRequestEvent
  const mergedRequestPayloadEvent = getMergedRequestPayloadEvent(requestEvent)
  if (mergedRequestPayloadEvent.found) {
    return mergedRequestPayloadEvent.value
  }

  if (event && event.type === 'ai-request') {
    return event.body
  }

  const name = getPreviewName(event)
  if (name === 'list_files' && hasOwn(event, 'arguments')) {
    return event.arguments
  }

  const payloadEvent = getPayloadObject(event, name)
  if (Object.keys(payloadEvent).length > 0) {
    return payloadEvent
  }
  return event
}
