export const escapeSingleQuotedString = (value: string): string => {
  return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")
}
