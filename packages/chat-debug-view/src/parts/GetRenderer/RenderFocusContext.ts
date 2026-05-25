import { ViewletCommand } from '@lvce-editor/constants'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const renderFocusContext = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly any[] => {
  const { uid } = newState
  console.log('set focus ctx', WhenExpression.FocusChatDebugTable)
  return [ViewletCommand.SetFocusContext, uid, WhenExpression.FocusChatDebugTable]
}
