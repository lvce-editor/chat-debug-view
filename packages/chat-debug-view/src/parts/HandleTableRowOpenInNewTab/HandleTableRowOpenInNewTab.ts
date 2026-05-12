import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'

const toDataUri = (text: string): string => {
  return `data:application/json,${encodeURIComponent(text)}`
}

export const handleTableRowOpenInNewTab = async (state: ChatDebugViewState, eventIndex: number): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  const event = currentEvents[eventIndex]
  if (!event) {
    return state
  }
  const text = JSON.stringify(event, null, 2)
  await RendererWorker.openUri(toDataUri(text))
  return state
}
