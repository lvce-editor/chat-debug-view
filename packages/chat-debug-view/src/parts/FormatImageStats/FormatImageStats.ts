import { formatImageSize } from '../FormatImageSize/FormatImageSize.ts'

export const formatImageStats = (width: number, height: number, size: number): string => {
  return `${width} × ${height} px · ${formatImageSize(size)}`
}
