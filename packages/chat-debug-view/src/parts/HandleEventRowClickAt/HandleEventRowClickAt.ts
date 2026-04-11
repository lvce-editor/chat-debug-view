import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableBodyEventIndex } from '../GetTableBodyEventIndex/GetTableBodyEventIndex.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { selectEventAtIndex } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const handleEventRowClickDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

const isPrimaryButton = (button: number): boolean => {
  return button === 0
}

export const handleEventRowClick = async (
  state: ChatDebugViewState,
  eventX: number,
  eventY: number,
  button: number = 0,
): Promise<ChatDebugViewState> => {
  if (!isPrimaryButton(button)) {
    return state
  }
  const selectedEventIndex = getTableBodyEventIndex(state, eventX, eventY)
  if (selectedEventIndex === -1) {
    return state
  }
  return selectEventAtIndex(state, selectedEventIndex, handleEventRowClickDependencies)
}
