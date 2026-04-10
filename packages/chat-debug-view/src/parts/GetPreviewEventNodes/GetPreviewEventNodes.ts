import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { isAttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getImagePreviewDom } from '../GetImagePreviewDom/GetImagePreviewDom.ts'
import { getTextNode } from '../GetTextNode/GetTextNode.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const getPreviewEventNodes = (previewEvent: unknown): readonly VirtualDomNode[] => {
  if (typeof previewEvent === 'string') {
    return getTextNode(previewEvent, previewEvent !== UiStrings.ImageCouldNotBeLoaded)
  }
  if (previewEvent === undefined) {
    return []
  }
  if (isAttachmentImagePreview(previewEvent)) {
    return getImagePreviewDom(previewEvent)
  }
  return getEventNode(previewEvent)
}
