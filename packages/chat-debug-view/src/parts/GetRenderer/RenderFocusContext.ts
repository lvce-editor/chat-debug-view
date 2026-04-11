import { ViewletCommand } from '@lvce-editor/constants'
import { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const renderFocusContext = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly any[] => {
  const { uid } = newState
  return [ViewletCommand.SetFocusContext, uid, WhenExpression.FocusChatDebugTable]
}
