import { ViewletCommand } from '@lvce-editor/constants'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { FocusChatDebugTable } from '../WhenExpression/WhenExpression.ts'

const getSelector = (focus: number): string => {
  if (focus === FocusChatDebugTable) {
    return '.Table'
  }
  return ''
}

export const renderFocus = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly any[] => {
  const { uid } = newState
  const selector = getSelector(newState.focus)
  console.log('render focus', selector)
  return [ViewletCommand.FocusSelector, uid, selector]
}
