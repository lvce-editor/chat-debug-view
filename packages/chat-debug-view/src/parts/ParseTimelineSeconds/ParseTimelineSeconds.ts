export const parseTimelineSeconds = (value: string): number | undefined => {
  const trimmed = value.trim()
  if (!trimmed) {
    return undefined
  }
  const parsed = Number.parseFloat(trimmed)
  if (!Number.isFinite(parsed) || parsed < 0) {
    return undefined
  }
  return parsed
}