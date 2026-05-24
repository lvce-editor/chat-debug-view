type EventLike = {
  readonly [key: string]: unknown
  readonly name?: unknown
  readonly subType?: unknown
  readonly type: string
}

export const getEventSubType = (event: EventLike, fallbackType: string = event.type, ignoreCurrentSubType: boolean = false): string => {
  if (typeof event.subType === 'string') {
    return event.subType
  }
  return event.type
}
