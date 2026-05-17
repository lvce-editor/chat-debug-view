import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { selectEventAtIndex } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

const isPrimaryButton = (button: number): boolean => {
  return button === 0
}

const getActualIndex = (index: string | number): number => {
  if (typeof index === 'string') {
    const parsed = Number.parseInt(index, 10)
    if (Number.isNaN(parsed)) {
      return -1
    }
    return parsed
  }
  return index
}

export const handleEventRowClick = async (state: ChatDebugViewState, index: string | number, button: number = 0): Promise<ChatDebugViewState> => {
  const actual = getActualIndex(index)
  if (!isPrimaryButton(button)) {
    return state
  }
  if (actual === -1) {
    return state
  }
  return selectEventAtIndex(state, actual)
}
