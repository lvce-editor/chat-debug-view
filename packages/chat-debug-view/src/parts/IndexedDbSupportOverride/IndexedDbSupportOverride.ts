import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const getIndexedDbSupportOverride = (state: ChatDebugViewState): boolean | undefined => {
  return state.indexedDbSupportOverride
}

export const setIndexedDbSupportOverride = (state: ChatDebugViewState, supported?: boolean): ChatDebugViewState => {
  return {
    ...state,
    indexedDbSupportOverride: supported,
  }
}
