import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as IsDetailTab from '../IsDetailTab/IsDetailTab.ts'
import * as SelectDetailTab from '../SelectDetailTab/SelectDetailTab.ts'

export const selectDetailTab = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  if (!IsDetailTab.isDetailTab(value)) {
    return state
  }
  const detailTabs = SelectDetailTab.selectDetailTab(state.detailTabs, value)
  if (detailTabs === state.detailTabs) {
    return state
  }
  return {
    ...state,
    detailTabs,
  }
}

export const handleDetailTabsFocus = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  return selectDetailTab(state, value)
}
