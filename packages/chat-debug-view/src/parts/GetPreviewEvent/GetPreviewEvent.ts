import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'
import { getPreviewMessageText } from '../GetPreviewMessageText/GetPreviewMessageText.ts'
import { getPreviewName } from '../GetPreviewName/GetPreviewName.ts'
import { getWriteFilePreviewText } from '../GetWriteFilePreviewText/GetWriteFilePreviewText.ts'
import { getSelectedEventPreview } from '../SelectedEventPreview/SelectedEventPreview.ts'

export const getPreviewEvent = (event: ChatViewEvent): unknown => {
  const selectedEventPreview = getSelectedEventPreview(event)
  if (selectedEventPreview !== undefined) {
    return selectedEventPreview
  }
  const previewMessageText = getPreviewMessageText(event)
  if (previewMessageText !== undefined) {
    return previewMessageText
  }
  const name = getPreviewName(event)
  const writeFilePreviewText = getWriteFilePreviewText(event, name)
  if (writeFilePreviewText !== undefined) {
    return writeFilePreviewText
  }
  return getPayloadEvent(event)
}
