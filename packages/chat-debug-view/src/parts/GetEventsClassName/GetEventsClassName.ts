export const getEventsClassName = (hasSelectedEvent: boolean, hasTimeline: boolean): string => {
  const widthClassName = hasSelectedEvent ? 'ChatDebugViewEvents' : 'ChatDebugViewEvents ChatDebugViewEventsFullWidth'
  return hasTimeline ? `${widthClassName} ChatDebugViewEvents--timeline` : widthClassName
}