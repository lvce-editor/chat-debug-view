import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'

export const getPayload = async (state: ChatDebugViewState): Promise<any> => {
  const { selectedEvent } = state
  if (!selectedEvent) {
    return undefined
  }
  const payload = getPayloadEvent(selectedEvent)
  return payload
}
