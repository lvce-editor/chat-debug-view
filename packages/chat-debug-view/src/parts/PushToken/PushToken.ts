interface TokenSegment {
  readonly className: string
  readonly value: string
}

export const pushToken = (segments: TokenSegment[], className: string, value: string): void => {
  if (!value) {
    return
  }
  const lastSegment = segments.at(-1)
  if (lastSegment && lastSegment.className === className) {
    const merged = {
      className,
      value: lastSegment.value + value,
    }
    segments[segments.length - 1] = merged
    return
  }
  segments.push({ className, value })
}
