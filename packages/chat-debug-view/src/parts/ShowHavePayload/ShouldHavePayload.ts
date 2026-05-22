
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { ChatDebugPayloadError } from '../ChatDebugPayloadError/ChatDebugPayloadError.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'
import { getPayloadMismatch } from '../GetPayloadMismatch/GetPayloadMismatch.ts'
import { getSelectedDetailTab } from '../GetSelectedDetailTab/GetSelectedDetailTab.ts'
import * as InputName from '../InputName/InputName.ts'





export const shouldHavePayload = async (state: ChatDebugViewState, match: unknown): Promise<ChatDebugViewState> => {
  if (!state.selectedEvent) {
    throw new Error('Expected selected event to exist')
  }
  const selectedDetailTab = getSelectedDetailTab(state.detailTabs)
  if (selectedDetailTab !== InputName.Payload) {
    throw new Error(`Expected selected detail tab to be payload but got ${selectedDetailTab}`)
  }
  const payload = getPayloadEvent(state.selectedEvent)
  const mismatch = getPayloadMismatch(payload, match)
  if (mismatch) {
    throw new ChatDebugPayloadError(mismatch)
  }
  return state
}

export {ChatDebugPayloadError} from '../ChatDebugPayloadError/ChatDebugPayloadError.ts'
export {type ChatDebugPayloadMismatch} from '../ChatDebugPayloadMismatch/ChatDebugPayloadMismatch.ts'
export {getPayloadMismatch as getMismatch} from '../GetPayloadMismatch/GetPayloadMismatch.ts'