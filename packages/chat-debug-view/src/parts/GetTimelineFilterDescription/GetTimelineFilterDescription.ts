export const getTimelineFilterDescription = (timelineStartSeconds: string, timelineEndSeconds: string): string => {
  const trimmedStart = timelineStartSeconds.trim()
  const trimmedEnd = timelineEndSeconds.trim()
  if (trimmedStart && trimmedEnd) {
    return `${trimmedStart}s-${trimmedEnd}s`
  }
  if (trimmedStart) {
    return `from ${trimmedStart}s`
  }
  if (trimmedEnd) {
    return `to ${trimmedEnd}s`
  }
  return ''
}
