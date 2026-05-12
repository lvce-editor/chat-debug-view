import { getRasterImageStats } from '../GetRasterImageStats/GetRasterImageStats.ts'
import { getSvgImageStats } from '../GetSvgImageStats/GetSvgImageStats.ts'

export const getImageStats = async (blob: Blob, mimeType: string | undefined): Promise<string> => {
  if (mimeType === 'image/svg+xml') {
    const svgStats = await getSvgImageStats(blob)
    if (svgStats === undefined) {
      throw new TypeError('image stats are not available')
    }
    return svgStats
  }
  return getRasterImageStats(blob)
}
