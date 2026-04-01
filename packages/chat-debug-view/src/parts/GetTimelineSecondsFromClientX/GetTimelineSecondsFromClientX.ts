import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { formatTimelinePresetValue } from '../FormatTimelinePresetValue/FormatTimelinePresetValue.ts'
import { getTimelineDurationSeconds } from '../GetTimelineInfo/GetTimelineInfo.ts'

export const getTimelineSecondsFromClientX = (
  events: readonly ChatViewEvent[],
  eventX: number,
  timelineLeft: number,
  timelineWidth: number,
): string | undefined => {
  if (timelineWidth <= 0) {
    return undefined
  }
  const durationSeconds = getTimelineDurationSeconds(events)
  const relativeX = Math.min(Math.max(eventX - timelineLeft, 0), timelineWidth)
  const ratio = relativeX / timelineWidth
  return formatTimelinePresetValue(durationSeconds * ratio)
}
