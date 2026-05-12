import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'

export interface TimingPreviewSegment {
  readonly endPercent: number
  readonly label: string
  readonly startPercent: number
}

export const getTimingPreviewSegments = (event: ChatViewEvent): readonly TimingPreviewSegment[] => {
  return [
    {
      endPercent: 100,
      label: getDurationText(event),
      startPercent: 0,
    },
  ]
}
