import type * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableBodyEventIndex } from '../GetTableBodyEventIndex/GetTableBodyEventIndex.ts'
import { handleEventRowClick } from '../HandleEventRowClick/HandleEventRowClick.ts'

type LoadSelectedEventFn = typeof LoadSelectedEvent.loadSelectedEvent

export const handleEventRowClickAt = async (
  state: ChatDebugViewState,
  eventX: number,
  eventY: number,
  button: number = 0,
  loadSelectedEvent?: LoadSelectedEventFn,
): Promise<ChatDebugViewState> => {
  const selectedEventIndex = getTableBodyEventIndex(state, eventX, eventY)
  return handleEventRowClick(state, selectedEventIndex, button, loadSelectedEvent)
}
