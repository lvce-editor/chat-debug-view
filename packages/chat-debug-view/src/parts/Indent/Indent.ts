export const indent = (value: string, count: number): string => {
  const prefix = ' '.repeat(count)
  return value
    .split('\n')
    .map((line) => `${prefix}${line}`)
    .join('\n')
}
