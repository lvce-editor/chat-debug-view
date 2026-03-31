import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'
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
  const state: ChatDebugViewState = {
    ...createDefaultState(),
    ...savedState,
    assetDir,
    databaseName,
    dataBaseVersion,
    eventStoreName,
    height,
    initial: true,
    platform,
    sessionId,
    sessionIdIndexName,
    uid,
    uri,
    width,
    x,
    y,
  }
  ChatDebugViewStates.set(uid, state, state)
}
