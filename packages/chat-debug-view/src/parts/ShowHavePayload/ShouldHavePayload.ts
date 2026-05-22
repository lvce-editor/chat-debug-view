import { ChatDebugPayloadError } from '../ChatDebugPayloadError/ChatDebugPayloadError.ts'
import { getPayloadMismatch } from '../GetPayloadMismatch/GetPayloadMismatch.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'
import { getSelectedDetailTab } from '../GetSelectedDetailTab/GetSelectedDetailTab.ts'
import type { ChatDebugPayloadMismatch } from '../ChatDebugPayloadMismatch/ChatDebugPayloadMismatch.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as InputName from '../InputName/InputName.ts'

export { ChatDebugPayloadError }
export type { ChatDebugPayloadMismatch }
export { getPayloadMismatch as getMismatch }

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
