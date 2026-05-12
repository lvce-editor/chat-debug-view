import { formatBytes } from '../FormatBytes/FormatBytes.ts'

export const formatImageSize = (size: number): string => {
  return formatBytes(size)
}
