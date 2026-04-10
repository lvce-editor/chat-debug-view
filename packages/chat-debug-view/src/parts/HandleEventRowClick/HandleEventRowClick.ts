import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { parseSelectedEventIndex } from '../ParseSelectedEventIndex/ParseSelectedEventIndex.ts'
import { selectEventAtIndex } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const handleEventRowClickDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

const isPrimaryButton = (button: number): boolean => {
  return button === 0
}

export const handleEventRowClick = async (state: ChatDebugViewState, value: string, button: number = 0): Promise<ChatDebugViewState> => {
  if (!isPrimaryButton(button)) {
    return state
  }
  const selectedEventIndex = parseSelectedEventIndex(value)
  if (selectedEventIndex === null) {
    return state
  }
  return selectEventAtIndex(state, selectedEventIndex, handleEventRowClickDependencies)
}
