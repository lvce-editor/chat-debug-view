import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'

export const getPayload = async (state: ChatDebugViewState): Promise<any> => {
  if (!state.selectedEvent) {
    return undefined
  }
  const payload = getPayloadEvent(state.selectedEvent)
  return payload
}
