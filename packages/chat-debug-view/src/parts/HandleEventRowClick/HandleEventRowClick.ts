import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { selectEventAtIndex } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const handleEventRowClickDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

const isPrimaryButton = (button: number): boolean => {
  return button === 0
}

const parseSelectedEventIndex = (value: string): number | null => {
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed < 0) {
    return null
  }
  return parsed
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
