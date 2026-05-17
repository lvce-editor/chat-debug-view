import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const shouldHavePayload = async (state: ChatDebugViewState, match: any): Promise<ChatDebugViewState> => {
  // TODO verify that we are in details payload tab, and that the payload matches with the given match data

  // const {} = state
  return state
}
