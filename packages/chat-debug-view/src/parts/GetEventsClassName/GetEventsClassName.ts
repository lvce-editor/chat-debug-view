import { ChatDebugViewEvents, ChatDebugViewEventsFullWidth, joinClassNames } from '../ClassNames/ClassNames.ts'

export const getEventsClassName = (hasSelectedEvent: boolean): string => {
  const widthClassName = joinClassNames(ChatDebugViewEvents, !hasSelectedEvent && ChatDebugViewEventsFullWidth)
  return widthClassName
}
