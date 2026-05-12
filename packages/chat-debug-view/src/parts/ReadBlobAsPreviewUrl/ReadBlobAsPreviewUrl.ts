export const readBlobAsPreviewUrl = (blob: Blob): string => {
  if (typeof FileReaderSync === 'function') {
    const reader = new FileReaderSync()
    return reader.readAsDataURL(blob)
  }
  if (typeof URL.createObjectURL === 'function') {
    return URL.createObjectURL(blob)
  }
  throw new Error('image preview reader is not available')
}
