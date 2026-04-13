export interface AttachmentImagePreview {
  readonly alt: string
  readonly previewType: 'image'
  readonly src: string
  readonly stats?: string
}

export const isAttachmentImagePreview = (value: unknown): value is AttachmentImagePreview => {
  return typeof value === 'object' && value !== null && (value as AttachmentImagePreview).previewType === 'image'
}
