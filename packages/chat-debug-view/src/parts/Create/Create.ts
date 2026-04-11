import type { SavedState } from '../SavedState/SavedState.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { restoreSavedState } from '../RestoreSavedState/RestoreSavedState.ts'
import * as ChatDebugViewStates from '../State/ChatDebugViewStates.ts'
import { createDefaultState } from '../State/CreateDefaultState.ts'

export const create = (
  uid: number,
  uri: string,
  x: number,
  y: number,
  width: number,
  height: number,
  platform: number,
  assetDir: string,
  sessionId = '',
  databaseName = 'lvce-chat-view-sessions',
  dataBaseVersion = 2,
  eventStoreName = 'chat-view-events',
  sessionIdIndexName = 'sessionId',
  savedState: Partial<SavedState> = {},
): void => {
  const defaultState = createDefaultState()
  const state: ChatDebugViewState = {
    ...restoreSavedState(defaultState, savedState),
    assetDir,
    databaseName,
    dataBaseVersion,
    eventStoreName,
    height,
    focus: 0,
    initial: true,
    platform,
    sessionId,
    sessionIdIndexName,
    tableColumns: [],
    uid,
    uri,
    width,
    x,
    y,
  }
  ChatDebugViewStates.set(uid, state, state)
}
