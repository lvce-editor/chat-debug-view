import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { setIndexedDbSupportOverride } from '../IndexedDbSupportOverride/IndexedDbSupportOverride.ts'

export const setIndexedDbSupportForTest = (state: ChatDebugViewState, supported?: boolean): ChatDebugViewState => {
  return setIndexedDbSupportOverride(state, supported)
}
