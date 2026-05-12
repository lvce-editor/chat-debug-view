export const formatImageSize = (size: number): string => {
  if (size < 1024) {
    return `${size} B`
  }
  return `${(size / 1024).toFixed(1)} kB`
}
