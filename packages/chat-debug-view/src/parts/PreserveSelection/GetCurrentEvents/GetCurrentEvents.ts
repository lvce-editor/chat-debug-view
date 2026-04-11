import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { getCurrentEvents as getSharedCurrentEvents } from '../../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'

export const getCurrentEvents = (state: ChatDebugViewState): ReturnType<typeof getSharedCurrentEvents> => getSharedCurrentEvents(state)
