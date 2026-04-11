import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { isAttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getImagePreviewDom } from '../GetImagePreviewDom/GetImagePreviewDom.ts'
import { getTextNode } from '../GetTextNode/GetTextNode.ts'
import { isChatMessageUpdatedEvent } from '../IsChatMessageUpdatedEvent/IsChatMessageUpdatedEvent.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const getPreviewEventNodes = (previewEvent: unknown, selectedEvent?: ChatViewEvent | null): readonly VirtualDomNode[] => {
  if (typeof previewEvent === 'string') {
    const isInvalidImageMessage = previewEvent === UiStrings.ImageCouldNotBeLoaded
    const isChatMessageUpdatedPreview = !!selectedEvent && isChatMessageUpdatedEvent(selectedEvent)
    const showLineNumbers = !isInvalidImageMessage && !isChatMessageUpdatedPreview
    return getTextNode(previewEvent, showLineNumbers)
  }
  if (previewEvent === undefined) {
    return []
  }
  if (isAttachmentImagePreview(previewEvent)) {
    return getImagePreviewDom(previewEvent)
  }
  return getEventNode(previewEvent)
}
