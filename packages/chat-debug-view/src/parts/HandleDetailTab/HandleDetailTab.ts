import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'

export const handleDetailTab = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  if (!DetailTab.isDetailTab(value)) {
    return state
  }
  return {
    ...state,
    selectedDetailTab: value,
  }
}
