import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const hasOwn = (event: ChatViewEvent, key: string): boolean => {
  return Object.hasOwn(event, key)
}

const isChatMessageUpdatedEvent = (event: ChatViewEvent): boolean => {
  return event.type === 'chat-message-updated'
}

const isChatMessageAddedEvent = (event: ChatViewEvent): boolean => {
  return event.type === 'chat-message-added'
}

const getPreviewMessageText = (event: ChatViewEvent): string | undefined => {
  if (isChatMessageUpdatedEvent(event) && typeof event.text === 'string') {
    return event.text
  }
  if (!isChatMessageAddedEvent(event)) {
    return undefined
  }
  const { message } = event
  if (!message || typeof message !== 'object') {
    return undefined
  }
  if (!Object.hasOwn(message, 'text')) {
    return undefined
  }
  const { text } = message as { readonly text?: unknown }
  if (typeof text !== 'string') {
    return undefined
  }
  return text
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

const shouldIncludeArguments = (event: ChatViewEvent, name: string | undefined): boolean => {
  if (!hasOwn(event, 'arguments')) {
    return false
  }
  if (name === 'getWorkspaceUri') {
    return false
  }
  return true
}

export const getPreviewEvent = (event: ChatViewEvent): unknown => {
  const previewMessageText = getPreviewMessageText(event)
  if (previewMessageText !== undefined) {
    return previewMessageText
  }
  const name = getPreviewName(event)
  const previewEvent = {
    ...(name === undefined ? {} : { name }),
    ...(shouldIncludeArguments(event, name) ? { arguments: event.arguments } : {}),
    ...(hasOwn(event, 'result') ? { result: event.result } : {}),
  }
  if (Object.keys(previewEvent).length > 0) {
    return previewEvent
  }
  return event
}
