import { roundSeconds } from '../RoundSeconds/RoundSeconds.ts'

export const getTimelineBadgeValues = (durationSeconds: number): readonly number[] => {
  if (durationSeconds <= 0) {
    return [0]
  }
  const segmentCount = durationSeconds < 1 ? 2 : Math.min(5, Math.max(1, Math.ceil(durationSeconds)))
  return Array.from({ length: segmentCount + 1 }, (_, index) => {
    if (index === segmentCount) {
      return durationSeconds
    }
    return roundSeconds((durationSeconds / segmentCount) * index)
  })
}
