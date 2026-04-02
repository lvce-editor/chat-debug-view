import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const hasOwn = (event: ChatViewEvent, key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(event, key)
}

const getPreviewName = (event: ChatViewEvent): string | undefined => {
  if (typeof event.name === 'string' && event.name) {
    return event.name
  }
  if (typeof event.toolName === 'string' && event.toolName) {
    return event.toolName
  }
  return undefined
}

export const getPreviewEvent = (event: ChatViewEvent): unknown => {
  const name = getPreviewName(event)
  const previewEvent = {
    ...(name === undefined ? {} : { name }),
    ...(hasOwn(event, 'arguments') ? { arguments: event.arguments } : {}),
    ...(hasOwn(event, 'result') ? { result: event.result } : {}),
  }
  if (Object.keys(previewEvent).length > 0) {
    return previewEvent
  }
  return event
}
