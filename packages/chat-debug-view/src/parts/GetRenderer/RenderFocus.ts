import { ViewletCommand } from '@lvce-editor/constants'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

const getSelector = (focus: number): string => {
  if (focus === 0) {
    return '.Table'
  }
  return ''
}

export const renderFocus = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly any[] => {
  const { uid } = newState
  const selector = getSelector(newState.focus)
  return [ViewletCommand.FocusSelector, uid, selector]
}
