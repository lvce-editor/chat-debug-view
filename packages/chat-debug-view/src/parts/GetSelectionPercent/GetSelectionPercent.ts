export const getSelectionPercent = (value: number, durationSeconds: number): number => {
  if (durationSeconds <= 0) {
    return 0
  }
  return Number(((value / durationSeconds) * 100).toFixed(3))
}