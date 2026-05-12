export const isImageMimeType = (mimeType: string | undefined): boolean => {
  return typeof mimeType === 'string' && mimeType.startsWith('image/')
}
