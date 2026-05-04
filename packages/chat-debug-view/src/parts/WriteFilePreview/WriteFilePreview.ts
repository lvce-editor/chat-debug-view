export interface WriteFilePreview {
  readonly content: string
  readonly previewType: 'write-file'
  readonly uri: string
}

export const isWriteFilePreview = (value: unknown): value is WriteFilePreview => {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as WriteFilePreview).previewType === 'write-file' &&
    typeof (value as WriteFilePreview).content === 'string' &&
    typeof (value as WriteFilePreview).uri === 'string'
  )
}
