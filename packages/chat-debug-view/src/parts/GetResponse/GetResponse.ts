import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getResponseEvent } from '../GetResponseEvent/GetResponseEvent.ts'

export const getResponse = async (state: ChatDebugViewState): Promise<any> => {
  const { selectedEvent } = state
  if (!selectedEvent) {
    return undefined
  }
  const payload = getResponseEvent(selectedEvent)
  return payload
}
