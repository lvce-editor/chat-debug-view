import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as GetBoolean from '../GetBoolean/GetBoolean.ts'
import { getSelectedEventIndex } from '../PreserveSelection/PreserveSelection.ts'

export const setUseDevtoolsLayout = (state: ChatDebugViewState, checked: string | boolean): ChatDebugViewState => {
  const useDevtoolsLayout = GetBoolean.getBoolean(checked)
  const selectedEventIndex = useDevtoolsLayout ? getSelectedEventIndex(state) : null
  return {
    ...state,
    selectedEvent: useDevtoolsLayout && selectedEventIndex !== null ? state.selectedEvent : null,
    selectedEventId: useDevtoolsLayout && selectedEventIndex !== null ? state.selectedEventId : null,
    selectedEventIndex,
    useDevtoolsLayout,
  }
}
