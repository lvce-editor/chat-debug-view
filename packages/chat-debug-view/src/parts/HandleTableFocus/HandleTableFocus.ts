import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { FocusChatDebugTable } from '../WhenExpression/WhenExpression.ts'

export const handleTableFocus = (state: ChatDebugViewState): ChatDebugViewState => {
  return {
    ...state,
    focus: FocusChatDebugTable,
  }
}
