import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getFetchCode } from '../GetFetchCode/GetFetchCode.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'

export const handleTableRowCopyAsFetch = async (state: ChatDebugViewState, eventIndex: number): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  const event = currentEvents[eventIndex]
  if (!event) {
    return state
  }
  const fetchCode = getFetchCode(event)
  if (fetchCode) {
    await RendererWorker.writeClipBoardText(fetchCode)
    return state
  }
  const text = JSON.stringify(event, null, 2)
  await RendererWorker.writeClipBoardText(text)
  return state
}
