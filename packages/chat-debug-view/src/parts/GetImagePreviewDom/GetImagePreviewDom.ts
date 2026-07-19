import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { AttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import {
  ChatDebugViewImagePreview,
  ChatDebugViewImagePreviewImage,
  ChatDebugViewImagePreviewImageWrapper,
  ChatDebugViewImagePreviewLabel,
} from '../ClassNames/ClassNames.ts'

const imagePreviewLabelNode: VirtualDomNode = {
  childCount: 1,
  className: ChatDebugViewImagePreviewLabel,
  type: VirtualDomElements.Span,
}

const imagePreviewStatsLabelNode: VirtualDomNode = {
  childCount: 2,
  className: ChatDebugViewImagePreviewLabel,
  type: VirtualDomElements.Span,
}

const imagePreviewStatsNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Span,
}

const imagePreviewAltNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Span,
}

const imagePreviewNode: VirtualDomNode = {
  childCount: 2,
  className: ChatDebugViewImagePreview,
  type: VirtualDomElements.Div,
}

const imagePreviewImageWrapperNode: VirtualDomNode = {
  childCount: 1,
  className: ChatDebugViewImagePreviewImageWrapper,
  type: VirtualDomElements.Div,
}

const getImagePreviewLabelDom = (preview: AttachmentImagePreview): readonly VirtualDomNode[] => {
  if (preview.stats === undefined) {
    return [imagePreviewLabelNode, text(preview.alt)]
  }
  return [imagePreviewStatsLabelNode, imagePreviewStatsNode, text(preview.stats), imagePreviewAltNode, text(preview.alt)]
}

export const getImagePreviewDom = (preview: AttachmentImagePreview): readonly VirtualDomNode[] => {
  return [
    imagePreviewNode,
    imagePreviewImageWrapperNode,
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
