import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as GetBoolean from '../GetBoolean/GetBoolean.ts'
import { getSelectedEventIndex } from '../PreserveSelection/PreserveSelection.ts'
import { getBalancedSplitTableWidth, shouldUseBalancedSplitTableWidth } from '../SplitLayout/SplitLayout.ts'
import { applyVirtualTableState } from '../VirtualTable/VirtualTable.ts'

export const setUseDevtoolsLayout = (state: ChatDebugViewState, checked: string | boolean): ChatDebugViewState => {
  const useDevtoolsLayout = GetBoolean.getBoolean(checked)
  const selectedEventIndex = useDevtoolsLayout ? getSelectedEventIndex(state) : null
  const hasSelectedEvent = useDevtoolsLayout && selectedEventIndex !== null
  const nextState = {
    ...state,
    previewTextCursorColumnIndex: hasSelectedEvent ? state.previewTextCursorColumnIndex : null,
    previewTextCursorRowIndex: hasSelectedEvent ? state.previewTextCursorRowIndex : null,
    previewTextDeltaY: hasSelectedEvent ? state.previewTextDeltaY : 0,
    previewTextScrollBarHandleOffset: 0,
    previewTextScrollBarPointerActive: false,
    selectedEvent: hasSelectedEvent ? state.selectedEvent : null,
    selectedEventId: hasSelectedEvent ? state.selectedEventId : null,
    selectedEventIndex,
    useDevtoolsLayout,
  }

  return applyVirtualTableState({
    ...nextState,
    tableWidth: shouldUseBalancedSplitTableWidth(nextState) ? getBalancedSplitTableWidth(nextState) : state.tableWidth,
  })
}
