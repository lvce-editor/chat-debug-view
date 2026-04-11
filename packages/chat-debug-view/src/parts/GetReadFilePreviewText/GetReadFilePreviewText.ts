import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getReadFilePreviewText = (event: ChatViewEvent, name: string | undefined): string | undefined => {
  if (name !== 'read_file') {
    return undefined
  }
  const { result } = event as { readonly result?: unknown }
  if (typeof result !== 'string') {
    return undefined
  }
  return result
}
