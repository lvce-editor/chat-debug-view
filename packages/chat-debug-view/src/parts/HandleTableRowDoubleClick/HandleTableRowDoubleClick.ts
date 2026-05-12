import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getResponseData } from '../GetResponseEvent/GetResponseEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableBodyEventIndex } from '../GetTableBodyEventIndex/GetTableBodyEventIndex.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'

const toDataUri = (text: string): string => {
  return `data:application/json,${encodeURIComponent(text)}`
}

export const handleTableRowDoubleClick = async (state: ChatDebugViewState, eventX: number, eventY: number): Promise<ChatDebugViewState> => {
  const eventIndex = getTableBodyEventIndex(state, eventX, eventY)
  if (eventIndex === -1) {
    return state
  }
  const event = getCurrentEvents(state)[eventIndex]
  if (!event) {
    return state
  }
  const responseData = getResponseData(event)
  if (responseData === undefined) {
    return state
  }
  const text = JSON.stringify(responseData, null, 2)
  if (!text) {
    return state
  }
  await RendererWorker.openUri(toDataUri(text))
  return state
}
