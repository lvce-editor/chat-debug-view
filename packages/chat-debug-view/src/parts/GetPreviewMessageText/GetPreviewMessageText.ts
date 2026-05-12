import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { isChatMessageAddedEvent } from '../IsChatMessageAddedEvent/IsChatMessageAddedEvent.ts'
import { isChatMessageUpdatedEvent } from '../IsChatMessageUpdatedEvent/IsChatMessageUpdatedEvent.ts'

const getObjectValue = (value: unknown): Record<string, unknown> | undefined => {
  if (!value || typeof value !== 'object') {
    return undefined
  }
  return value as Record<string, unknown>
}

const getResponseContentText = (content: unknown): string | undefined => {
  const contentObject = getObjectValue(content)
  if (!contentObject) {
    return undefined
  }
  if (Array.isArray(content)) {
    const [firstContentItem] = content
    const firstContentItemObject = getObjectValue(firstContentItem)
    if (!firstContentItemObject) {
      return undefined
    }
    const { text } = firstContentItemObject
    return typeof text === 'string' ? text : undefined
  }
  const { text } = contentObject
  return typeof text === 'string' ? text : undefined
}

const getOutput = (value: unknown): readonly unknown[] | undefined => {
  const valueObject = getObjectValue(value)
  if (!valueObject) {
    return undefined
  }
  const { output } = valueObject
  return Array.isArray(output) ? output : undefined
}

const getAiRequestResponseOutput = (event: ChatViewEvent): readonly unknown[] | undefined => {
  const { endValue } = event as { readonly endValue?: unknown }
  const endValueObject = getObjectValue(endValue)
  if (!endValueObject) {
    return undefined
  }
  return getOutput(endValueObject.value)
}

const getCompletedResponseOutput = (event: ChatViewEvent): readonly unknown[] | undefined => {
  const valueObject = getObjectValue(event.value)
  if (!valueObject) {
    return undefined
  }
  const responseObject = getObjectValue(valueObject.response)
  if (!responseObject) {
    return undefined
  }
  return getOutput(responseObject)
}

const getResponseOutput = (event: ChatViewEvent): readonly unknown[] | undefined => {
  switch (event.type) {
    case 'ai-request':
      return getAiRequestResponseOutput(event)
    case 'sse-response-completed':
      return getCompletedResponseOutput(event)
    case 'ai-response':
      return getOutput(event.value)
    default:
      return undefined
  }
}

const getResponsePreviewText = (event: ChatViewEvent): string | undefined => {
  const output = getResponseOutput(event)
  if (!output || output.length === 0) {
    return undefined
  }
  const [firstOutput] = output
  const firstOutputObject = getObjectValue(firstOutput)
  if (!firstOutputObject) {
    return undefined
  }
  const { content } = firstOutputObject
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
