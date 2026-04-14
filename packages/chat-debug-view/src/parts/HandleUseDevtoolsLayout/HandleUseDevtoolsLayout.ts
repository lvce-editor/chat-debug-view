import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as GetBoolean from '../GetBoolean/GetBoolean.ts'
import { getSelectedEventIndex } from '../PreserveSelection/PreserveSelection.ts'
import { applyVirtualTableState } from '../VirtualTable/VirtualTable.ts'

export const setUseDevtoolsLayout = (state: ChatDebugViewState, checked: string | boolean): ChatDebugViewState => {
  const useDevtoolsLayout = GetBoolean.getBoolean(checked)
  const selectedEventIndex = useDevtoolsLayout ? getSelectedEventIndex(state) : null
  return applyVirtualTableState({
    ...state,
    previewTextCursorColumnIndex: useDevtoolsLayout && selectedEventIndex !== null ? state.previewTextCursorColumnIndex : null,
    previewTextCursorRowIndex: useDevtoolsLayout && selectedEventIndex !== null ? state.previewTextCursorRowIndex : null,
    selectedEvent: useDevtoolsLayout && selectedEventIndex !== null ? state.selectedEvent : null,
    selectedEventId: useDevtoolsLayout && selectedEventIndex !== null ? state.selectedEventId : null,
    selectedEventIndex,
    useDevtoolsLayout,
  })
}
