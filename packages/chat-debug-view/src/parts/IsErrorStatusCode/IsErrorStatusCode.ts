export const isErrorStatusCode = (value: unknown): boolean => {
  if (typeof value === 'number') {
    return value >= 400
  }
  if (typeof value === 'string') {
    const parsedStatus = Number(value)
    return Number.isFinite(parsedStatus) && parsedStatus >= 400
  }
  return false
}
