import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getListFilesPreviewEvent = (event: ChatViewEvent, name: string | undefined): unknown => {
  if (name !== 'list_files') {
    return undefined
  }
  const { result } = event as { readonly result?: unknown }
  if (typeof result !== 'object' || result === null || !Object.hasOwn(result, 'entries')) {
    return undefined
  }
  const { entries } = result as { readonly entries?: unknown }
  return entries
}
