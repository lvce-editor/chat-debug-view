import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { FocusChatDebugTable } from '../WhenExpression/WhenExpression.ts'

export const handleTableFocus = (state: ChatDebugViewState): ChatDebugViewState => {
  console.log('got table focus', state.focus, FocusChatDebugTable)
  return {
    ...state,
    focus: FocusChatDebugTable,
  }
}
