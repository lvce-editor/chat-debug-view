export const getEventsClassName = (hasSelectedEvent: boolean): string => {
  const widthClassName = hasSelectedEvent ? 'ChatDebugViewEvents' : 'ChatDebugViewEvents ChatDebugViewEventsFullWidth'
  return widthClassName
}
