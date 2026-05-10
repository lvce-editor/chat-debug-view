import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { PreviewTextCursor } from '../PreviewTextCursor/PreviewTextCursor.ts'
import { isAttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getImagePreviewDom } from '../GetImagePreviewDom/GetImagePreviewDom.ts'
import { getLanguageFromFileExtension } from '../GetLanguageFromFileExtension/GetLanguageFromFileExtension.ts'
import { getSyntaxHighlightTokens } from '../GetSyntaxHighlightTokens/GetSyntaxHighlightTokens.ts'
import { getTextNode, type TextNodeVirtualizationOptions } from '../GetTextNode/GetTextNode.ts'
import { isChatMessageUpdatedEvent } from '../IsChatMessageUpdatedEvent/IsChatMessageUpdatedEvent.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'
import { isWriteFilePreview } from '../WriteFilePreview/WriteFilePreview.ts'

const getTextEvent = (
  previewEvent: string,
  selectedEvent?: ChatViewEvent | null,
  previewTextCursor?: PreviewTextCursor | null,
  virtualization?: TextNodeVirtualizationOptions,
): readonly VirtualDomNode[] => {
  const isInvalidImageMessage = previewEvent === UiStrings.ImageCouldNotBeLoaded
  const isChatMessageUpdatedPreview = !!selectedEvent && isChatMessageUpdatedEvent(selectedEvent)
  const showLineNumbers = !isInvalidImageMessage && !isChatMessageUpdatedPreview
  return getTextNode(previewEvent, showLineNumbers, showLineNumbers ? (previewTextCursor ?? null) : null, undefined, virtualization)
}

export const getPreviewEventNodes = (
  previewEvent: unknown,
  selectedEvent?: ChatViewEvent | null,
  previewTextCursor?: PreviewTextCursor | null,
  virtualization?: TextNodeVirtualizationOptions,
): readonly VirtualDomNode[] => {
  if (typeof previewEvent === 'string') {
    return getTextEvent(previewEvent, selectedEvent, previewTextCursor, virtualization)
  }
  if (isWriteFilePreview(previewEvent)) {
    const language = getLanguageFromFileExtension(previewEvent.uri)
    const tokenSegments = language ? getSyntaxHighlightTokens(previewEvent.content, language) : undefined
    return getTextNode(previewEvent.content, true, previewTextCursor ?? null, tokenSegments, virtualization)
  }
  if (previewEvent === undefined) {
    return []
  }
  if (isAttachmentImagePreview(previewEvent)) {
    return getImagePreviewDom(previewEvent)
  }
  return getEventNode(previewEvent)
}
