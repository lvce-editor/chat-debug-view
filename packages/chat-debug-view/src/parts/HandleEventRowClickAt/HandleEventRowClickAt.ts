import { getTableBodyEventIndex } from '../GetTableBodyEventIndex/GetTableBodyEventIndex.ts'
import { handleEventRowClick } from '../HandleEventRowClick/HandleEventRowClick.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleEventRowClickAt = async (
  state: ChatDebugViewState,
  eventX: number,
  eventY: number,
  button: number = 0,
): Promise<ChatDebugViewState> => {
  const selectedEventIndex = getTableBodyEventIndex(state, eventX, eventY)
  return handleEventRowClick(state, selectedEventIndex, button)
}
