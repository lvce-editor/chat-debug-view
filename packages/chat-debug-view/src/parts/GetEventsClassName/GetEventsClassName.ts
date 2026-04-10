import { mergeClassNames } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEvents, ChatDebugViewEventsFullWidth } from '../ClassNames/ClassNames.ts'

export const getEventsClassName = (hasSelectedEvent: boolean): string => {
  const widthClassName = mergeClassNames(ChatDebugViewEvents, !hasSelectedEvent ? ChatDebugViewEventsFullWidth : '')
  return widthClassName
}
