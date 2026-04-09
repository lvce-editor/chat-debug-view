import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

export const getTimelineFilterDescription = (timelineStartSeconds: string, timelineEndSeconds: string): string => {
  const trimmedStart = timelineStartSeconds.trim()
  const trimmedEnd = timelineEndSeconds.trim()
  if (trimmedStart && trimmedEnd) {
    return ChatDebugStrings.secondsRange(trimmedStart, trimmedEnd)
  }
  if (trimmedStart) {
    return ChatDebugStrings.fromSeconds(trimmedStart)
  }
  if (trimmedEnd) {
    return ChatDebugStrings.toSeconds(trimmedEnd)
  }
  return ''
}
