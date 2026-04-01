interface TokenSegment {
  readonly className: string
  readonly value: string
}

export const pushToken = (segments: readonly TokenSegment[], className: string, value: string): readonly TokenSegment[] => {
  if (!value) {
    return segments
  }
  const lastSegment = segments.at(-1)
  if (lastSegment && lastSegment.className === className) {
    const merged = {
      className,
      value: lastSegment.value + value,
    }
    return [...segments.slice(0, -1), merged]
  }
  return [...segments, { className, value }]
}
