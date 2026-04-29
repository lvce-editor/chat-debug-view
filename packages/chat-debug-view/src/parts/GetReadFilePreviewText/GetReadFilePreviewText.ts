import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const getContent = (value: unknown): string | undefined => {
  if (!value || typeof value !== 'object') {
    return undefined
  }
  const { content } = value as {
    readonly content?: unknown
  }
  if (typeof content !== 'string') {
    return undefined
  }
  return content
}

export const getReadFilePreviewText = (event: ChatViewEvent, name: string | undefined): string | undefined => {
  if (name !== 'read_file') {
    return undefined
  }
  const { result } = event as { readonly result?: unknown }
  if (typeof result === 'string') {
    return result
  }
  const content = getContent(result)
  if (content !== undefined) {
    return content
  }
  if (!Array.isArray(result) || result.length !== 1) {
    return undefined
  }
  return getContent(result[0])
}
