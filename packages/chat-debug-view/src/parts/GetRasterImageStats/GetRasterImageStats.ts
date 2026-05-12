import { formatImageStats } from '../FormatImageStats/FormatImageStats.ts'

export const getRasterImageStats = async (blob: Blob): Promise<string> => {
  if (typeof createImageBitmap !== 'function') {
    throw new TypeError('image bitmap decoder is not available')
  }
  const bitmap = await createImageBitmap(blob)
  try {
    return formatImageStats(bitmap.width, bitmap.height, blob.size)
  } finally {
    bitmap.close?.()
  }
}
