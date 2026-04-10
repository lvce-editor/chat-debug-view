import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getStateWithTimelineInfo } from '../GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { setSelectedEventPreview } from '../SelectedEventPreview/SelectedEventPreview.ts'

export const setAttachmentPreviewEventForTest = (
  state: ChatDebugViewState,
  sessionId: string,
  name: string,
  mimeType: string,
  previewType: string,
  previewValue: string,
): ChatDebugViewState => {
  const event = {
    mimeType,
    name,
    sessionId,
    timestamp: '2026-04-10T11:35:00.000Z',
    type: 'chat-attachment-added',
  }
  const selectedEvent =
    previewType === 'image'
      ? setSelectedEventPreview(event, {
          alt: name,
          previewType: 'image',
          src: previewValue,
        })
      : setSelectedEventPreview(event, previewValue)
  return getStateWithTimelineInfo({
    ...state,
    errorMessage: '',
    events: [selectedEvent],
    initial: false,
    selectedEvent,
    selectedEventId: null,
    selectedEventIndex: 0,
  })
}