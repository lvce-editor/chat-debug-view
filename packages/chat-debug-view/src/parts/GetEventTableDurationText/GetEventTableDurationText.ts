import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'

export const getEventTableDurationText = (event: ChatViewEvent): string => {
  const durationText = getDurationText(event)
  if (!durationText.endsWith('ms')) {
    return durationText
  }
  return `${durationText.slice(0, -2)} ms`
}
