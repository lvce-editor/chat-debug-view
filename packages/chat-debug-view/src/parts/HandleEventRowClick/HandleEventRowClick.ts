import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

const parseSelectedEventIndex = (value: string): number | null => {
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed < 0) {
    return null
  }
  return parsed
}

export const handleEventRowClick = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  const selectedEventIndex = parseSelectedEventIndex(value)
  if (selectedEventIndex === null) {
    return state
  }
  return {
    ...state,
    selectedEventIndex,
  }
}
