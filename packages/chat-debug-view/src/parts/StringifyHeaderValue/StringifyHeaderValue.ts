export const stringifyHeaderValue = (value: Readonly<object>): string => {
  try {
    return JSON.stringify(value, (_key, nestedValue: unknown) => {
      if (typeof nestedValue === 'bigint') {
        return nestedValue.toString()
      }
      return nestedValue
    })
  } catch {
    return '[unserializable]'
  }
}