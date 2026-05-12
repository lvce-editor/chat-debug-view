export const createCanvasBlob = async (mimeType: string): Promise<Blob> => {
  const canvas = new OffscreenCanvas(2, 2)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('2d canvas context is not available')
  }
  context.fillStyle = '#0b6'
  context.fillRect(0, 0, 2, 2)
  return canvas.convertToBlob({
    type: mimeType,
  })
}
