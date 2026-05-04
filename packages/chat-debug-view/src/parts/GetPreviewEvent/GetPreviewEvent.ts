import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getListFilesPreviewEvent } from '../GetListFilesPreviewEvent/GetListFilesPreviewEvent.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'
import { getPreviewMessageText } from '../GetPreviewMessageText/GetPreviewMessageText.ts'
import { getPreviewName } from '../GetPreviewName/GetPreviewName.ts'
import { getReadFilePreviewText } from '../GetReadFilePreviewText/GetReadFilePreviewText.ts'
import { getSseResponseCompletedPreviewEvent } from '../GetSseResponseCompletedPreviewEvent/GetSseResponseCompletedPreviewEvent.ts'
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
  const sseResponseCompletedPreviewEvent = getSseResponseCompletedPreviewEvent(event)
  if (sseResponseCompletedPreviewEvent !== undefined) {
    return sseResponseCompletedPreviewEvent
  }
  const name = getPreviewName(event)
  const writeFilePreviewText = getWriteFilePreviewText(event, name)
  if (writeFilePreviewText !== undefined) {
    return writeFilePreviewText
  }
  const readFilePreviewText = getReadFilePreviewText(event, name)
  if (readFilePreviewText !== undefined) {
    return readFilePreviewText
  }
  const listFilesPreviewEvent = getListFilesPreviewEvent(event, name)
  if (listFilesPreviewEvent !== undefined) {
    return listFilesPreviewEvent
  }
  return getPayloadEvent(event)
}
