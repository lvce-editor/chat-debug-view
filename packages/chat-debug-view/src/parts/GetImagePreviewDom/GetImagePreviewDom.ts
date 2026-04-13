import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { AttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import {
  ChatDebugViewImagePreview,
  ChatDebugViewImagePreviewImage,
  ChatDebugViewImagePreviewImageWrapper,
  ChatDebugViewImagePreviewLabel,
} from '../ClassNames/ClassNames.ts'

export const getImagePreviewDom = (preview: AttachmentImagePreview): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ChatDebugViewImagePreview,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ChatDebugViewImagePreviewImageWrapper,
      type: VirtualDomElements.Div,
    },
    {
      alt: preview.alt,
      childCount: 0,
      className: ChatDebugViewImagePreviewImage,
      src: preview.src,
      type: VirtualDomElements.Img,
    },
    {
      childCount: 1,
      className: ChatDebugViewImagePreviewLabel,
      type: VirtualDomElements.Span,
    },
    text(preview.stats ?? preview.alt),
  ]
}
