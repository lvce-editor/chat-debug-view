import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getFailedToLoadMessage } from '../GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'
import { getIndexedDbNotSupportedMessage } from '../GetIndexedDbNotSupportedMessage/GetIndexedDbNotSupportedMessage.ts'
import { getInvalidUriMessage } from '../GetInvalidUriMessage/GetInvalidUriMessage.ts'
import { getSessionNotFoundMessage } from '../GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts'
import { filterEventsByTimelineRange } from '../GetTimelineInfo/GetTimelineInfo.ts'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ListChatViewEvents from '../ListChatViewEvents/ListChatViewEvents.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { parseChatDebugUri } from '../ParseChatDebugUri/ParseChatDebugUri.ts'

export const loadEventsDependencies = {
  listChatViewEvents: ListChatViewEvents.listChatViewEvents,
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

const getCurrentEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => {
  const filteredEvents = getFilteredEvents(
    state.events,
    state.filterValue,
    state.eventCategoryFilter,
    state.showInputEvents,
    state.showResponsePartEvents,
    state.showEventStreamFinishedEvents,
  )
  return filterEventsByTimelineRange(filteredEvents, state.timelineStartSeconds, state.timelineEndSeconds)
}

const restoreSelectedEvent = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  if (state.selectedEventId === null) {
    return {
      ...state,
      selectedEvent: null,
      selectedEventIndex: null,
    }
  }
  const currentEvents = getCurrentEvents(state)
  const selectedEventIndex = currentEvents.findIndex((event) => event.eventId === state.selectedEventId)
  if (selectedEventIndex === -1) {
    return {
      ...state,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
    }
  }
  const selectedEvent = currentEvents[selectedEventIndex]
  if (!selectedEvent || typeof selectedEvent.eventId !== 'number') {
    return {
      ...state,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
    }
  }
  const selectedEventDetails = await loadEventsDependencies.loadSelectedEvent(
    state.databaseName,
    state.dataBaseVersion,
    state.eventStoreName,
    state.sessionId,
    state.sessionIdIndexName,
    selectedEvent.eventId,
    selectedEvent.type,
  )
  return {
    ...state,
    selectedEvent: selectedEventDetails,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex,
  }
}

const getStateWithInvalidUri = (state: ChatDebugViewState): ChatDebugViewState => {
  const parsed = parseChatDebugUri(state.uri)
  if (parsed.type !== 'error') {
    return state
  }
  return {
    ...state,
    errorMessage: getInvalidUriMessage(state.uri, parsed.code),
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId: '',
  }
}

export const getSessionIdFromUri = (state: ChatDebugViewState): string | undefined => {
  const parsed = parseChatDebugUri(state.uri)
  if (parsed.type === 'error') {
    return undefined
  }
  return parsed.sessionId
}

export const loadEventsForSessionId = async (state: ChatDebugViewState, sessionId: string): Promise<ChatDebugViewState> => {
  const { databaseName, dataBaseVersion, eventStoreName, indexedDbSupportOverride, sessionIdIndexName } = state
  const result = await loadEventsDependencies.listChatViewEvents(
    sessionId,
    databaseName,
    dataBaseVersion,
    eventStoreName,
    sessionIdIndexName,
    indexedDbSupportOverride,
  )
  if (result.type === 'not-supported') {
    return {
      ...state,
      errorMessage: getIndexedDbNotSupportedMessage(),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
      sessionId,
    }
  }

  if (result.type === 'error') {
    return {
      ...state,
      errorMessage: getFailedToLoadMessage(sessionId),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
      sessionId,
    }
  }

  const { events } = result
  if (events.length === 0) {
    return {
      ...state,
      errorMessage: getSessionNotFoundMessage(sessionId),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
      sessionId,
    }
  }

  const nextState = {
    ...state,
    errorMessage: '',
    events,
    initial: false,
    sessionId,
  }
  return restoreSelectedEvent(nextState)
}

export const loadEventsFromUri = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const sessionId = getSessionIdFromUri(state)
  if (!sessionId) {
    return getStateWithInvalidUri(state)
  }
  return loadEventsForSessionId(state, sessionId)
}

export const refreshEvents = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const sessionId = state.sessionId || getSessionIdFromUri(state)
  if (!sessionId) {
    return getStateWithInvalidUri(state)
  }
  return loadEventsForSessionId(state, sessionId)
}
