import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { selectEventAtIndex } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const handleEventRowClickDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

const isPrimaryButton = (button: number): boolean => {
  return button === 0
}

export const handleEventRowClick = async (state: ChatDebugViewState, index: string | number, button: number = 0): Promise<ChatDebugViewState> => {
  const actual = typeof index === 'string' ? Number.parseInt(index, 10) : index
  if (!isPrimaryButton(button)) {
    return state
  }
  if (actual === -1) {
    return state
  }
  return selectEventAtIndex(state, actual, handleEventRowClickDependencies)
}
