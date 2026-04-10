import type { AttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const selectedEventPreviewSymbol = Symbol('selectedEventPreview')

type SelectedEventPreviewValue = AttachmentImagePreview | string | undefined

type ChatViewEventWithPreview = ChatViewEvent & {
  readonly [selectedEventPreviewSymbol]?: SelectedEventPreviewValue
}

export const getSelectedEventPreview = (event: ChatViewEvent): SelectedEventPreviewValue => {
  return (event as ChatViewEventWithPreview)[selectedEventPreviewSymbol]
}

export const setSelectedEventPreview = (event: ChatViewEvent, preview: SelectedEventPreviewValue): ChatViewEvent => {
  if (preview === undefined) {
    return event
  }
  Object.defineProperty(event, selectedEventPreviewSymbol, {
    configurable: true,
    enumerable: false,
    value: preview,
    writable: true,
  })
  return event
}
