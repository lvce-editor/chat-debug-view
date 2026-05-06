import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { isChatMessageAddedEvent } from '../IsChatMessageAddedEvent/IsChatMessageAddedEvent.ts'
import { isChatMessageUpdatedEvent } from '../IsChatMessageUpdatedEvent/IsChatMessageUpdatedEvent.ts'

const getResponseContentText = (content: unknown): string | undefined => {
  if (!content || typeof content !== 'object') {
    return undefined
  }
  if (Array.isArray(content)) {
    const [firstContentItem] = content
    if (!firstContentItem || typeof firstContentItem !== 'object') {
      return undefined
    }
    const { text } = firstContentItem as { readonly text?: unknown }
    return typeof text === 'string' ? text : undefined
  }
  const { text } = content as { readonly text?: unknown }
  return typeof text === 'string' ? text : undefined
}

const getResponseOutput = (event: ChatViewEvent): readonly unknown[] | undefined => {
  if (event.type === 'sse-response-completed') {
    const { value } = event
    if (!value || typeof value !== 'object') {
      return undefined
    }
    const { response } = value as { readonly response?: unknown }
    if (!response || typeof response !== 'object') {
      return undefined
    }
    const { output } = response as { readonly output?: unknown }
    return Array.isArray(output) ? output : undefined
  }
  if (event.type === 'ai-response') {
    const { value } = event
    if (!value || typeof value !== 'object') {
      return undefined
    }
    const { output } = value as { readonly output?: unknown }
    return Array.isArray(output) ? output : undefined
  }
  return undefined
}

const getResponsePreviewText = (event: ChatViewEvent): string | undefined => {
  const output = getResponseOutput(event)
  if (!output || output.length === 0) {
    return undefined
  }
  const [firstOutput] = output
  if (!firstOutput || typeof firstOutput !== 'object') {
    return undefined
  }
  const { content } = firstOutput as { readonly content?: unknown }
  return getResponseContentText(content)
}

export const getPreviewMessageText = (event: ChatViewEvent): string | undefined => {
  if (isChatMessageUpdatedEvent(event) && typeof event.text === 'string') {
    return event.text
  }
  const responsePreviewText = getResponsePreviewText(event)
  if (responsePreviewText !== undefined) {
    return responsePreviewText
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
