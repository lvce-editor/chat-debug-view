import { formatImageStats } from '../FormatImageStats/FormatImageStats.ts'

const svgWidthRegex = /\bwidth=["']([\d.]+)(?:px)?["']/i
const svgHeightRegex = /\bheight=["']([\d.]+)(?:px)?["']/i
const svgViewBoxRegex = /\bviewBox=["'][^"']*?([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)["']/i

export const getSvgImageStats = async (blob: Blob): Promise<string | undefined> => {
  const text = await blob.text()
  const widthMatch = text.match(svgWidthRegex)
  const heightMatch = text.match(svgHeightRegex)
  if (widthMatch && heightMatch) {
    return formatImageStats(Number(widthMatch[1]), Number(heightMatch[1]), blob.size)
  }
  const viewBoxMatch = text.match(svgViewBoxRegex)
  if (viewBoxMatch) {
    return formatImageStats(Number(viewBoxMatch[3]), Number(viewBoxMatch[4]), blob.size)
  }
  return undefined
}
