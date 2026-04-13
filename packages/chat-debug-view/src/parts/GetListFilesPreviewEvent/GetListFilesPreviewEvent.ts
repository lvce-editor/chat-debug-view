import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getListFilesPreviewEvent = (event: ChatViewEvent, name: string | undefined): unknown => {
  if (name !== 'list_files') {
    return undefined
  }
  const { result } = event as { readonly result?: unknown }
  if (typeof result !== 'object' || result === null) {
    return undefined
  }
  const { entries, error } = result as { readonly entries?: unknown; readonly error?: unknown }
  if (entries !== undefined) {
    return entries
  }
  return error
}
