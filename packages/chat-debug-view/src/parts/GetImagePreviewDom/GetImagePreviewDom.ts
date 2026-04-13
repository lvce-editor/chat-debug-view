import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { AttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import {
  ChatDebugViewImagePreview,
  ChatDebugViewImagePreviewImage,
  ChatDebugViewImagePreviewImageWrapper,
  ChatDebugViewImagePreviewLabel,
} from '../ClassNames/ClassNames.ts'

const getImagePreviewLabelDom = (preview: AttachmentImagePreview): readonly VirtualDomNode[] => {
  if (preview.stats === undefined) {
    return [
      {
        childCount: 1,
        className: ChatDebugViewImagePreviewLabel,
        type: VirtualDomElements.Span,
      },
      text(preview.alt),
    ]
  }
  return [
    {
      childCount: 2,
      className: ChatDebugViewImagePreviewLabel,
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Span,
    },
    text(preview.stats),
    {
      childCount: 1,
      type: VirtualDomElements.Span,
    },
    text(preview.alt),
  ]
}

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
    ...getImagePreviewLabelDom(preview),
  ]
}
