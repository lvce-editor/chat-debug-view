import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import { isAttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import { getEventTypeLabel } from '../GetEventTypeLabel/GetEventTypeLabel.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'
import { getPreviewEvent } from '../GetPreviewEvent/GetPreviewEvent.ts'
import { getResponseEvent } from '../GetResponseEvent/GetResponseEvent.ts'
import * as InputName from '../InputName/InputName.ts'
import { isChatMessageUpdatedEvent } from '../IsChatMessageUpdatedEvent/IsChatMessageUpdatedEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { defaultPreviewTextColumnWidth } from '../PreviewTextCursor/PreviewTextCursor.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

const getStringLineCount = (value: string): number => {
  return value.split('\n').length
}

const isChatViewEvent = (value: unknown): value is ChatViewEvent => {
  return typeof value === 'object' && value !== null && typeof (value as ChatViewEvent).type === 'string'
}

const getJsonLineCount = (value: unknown): number => {
  const renderedValue = isChatViewEvent(value)
    ? {
        ...value,
        type: getEventTypeLabel(value),
      }
    : value
  const json = JSON.stringify(renderedValue, null, 2)
  if (!json) {
    return 1
  }
  let lineCount = 1
  for (let i = 0; i < json.length; i++) {
    if (json[i] === '\n') {
      lineCount++
    }
  }
  return lineCount
}

const getPreviewLineCount = (selectedEvent: ChatViewEvent): number => {
  const previewEvent = getPreviewEvent(selectedEvent)
  if (previewEvent === undefined || isAttachmentImagePreview(previewEvent)) {
    return 0
  }
  if (typeof previewEvent === 'string') {
    if (previewEvent === UiStrings.ImageCouldNotBeLoaded || isChatMessageUpdatedEvent(selectedEvent)) {
      return 0
    }
    return getStringLineCount(previewEvent)
  }
  return getJsonLineCount(previewEvent)
}

const getLineCount = (state: ChatDebugViewState): number => {
  const { selectedEvent } = state
  if (!selectedEvent) {
    return 0
  }
  const selectedDetailTab = DetailTab.getSelectedDetailTab(state.detailTabs)
  if (selectedDetailTab === InputName.Timing) {
    return 0
  }
  if (selectedDetailTab === InputName.Preview) {
    return getPreviewLineCount(selectedEvent)
  }
  if (selectedDetailTab === InputName.Payload) {
    return getJsonLineCount(getPayloadEvent(selectedEvent))
  }
  return getJsonLineCount(getResponseEvent(selectedEvent))
}

export const getDetailsLineNumberWidth = (state: ChatDebugViewState): number => {
  const lineCount = getLineCount(state)
  if (lineCount === 0) {
    return 0
  }
  return String(lineCount).length * defaultPreviewTextColumnWidth
}
