import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getCurrentEvents } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const handleTableRowCopy = async (state: ChatDebugViewState, eventIndex: number): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  const event = currentEvents[eventIndex]
  if (!event) {
    return state
  }
  const text = JSON.stringify(event, null, 2)
  await RendererWorker.writeClipBoardText(text)
  return state
}
