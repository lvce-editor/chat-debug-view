export const formatTimelineSeconds = (value: number): string => {
  if (Number.isInteger(value)) {
    return `${value}s`
  }
  return `${Number(value.toFixed(1))}s`
}
