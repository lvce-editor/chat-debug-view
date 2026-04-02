import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as FocusFirst from '../FocusFirst/FocusFirst.ts'
import * as FocusLast from '../FocusLast/FocusLast.ts'
import * as FocusNext from '../FocusNext/FocusNext.ts'
import * as FocusPrevious from '../FocusPrevious/FocusPrevious.ts'

export const handleTableKeyDown = async (state: ChatDebugViewState, key: string): Promise<ChatDebugViewState> => {
  if (key === 'ArrowDown') {
    return FocusNext.focusNext(state)
  }
  if (key === 'ArrowUp') {
    return FocusPrevious.focusPrevious(state)
  }
  if (key === 'Home') {
    return FocusFirst.focusFirst(state)
  }
  if (key === 'End') {
    return FocusLast.focusLast(state)
  }
  return state
}
