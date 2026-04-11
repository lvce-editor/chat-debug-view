export const formatTimelineMilliseconds = (value: number): string => {
  return `${Math.round(value * 1000)}ms`
}
