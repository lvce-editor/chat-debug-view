import type { SavedState } from '../SavedState/SavedState.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { parseFilterValue } from '../ParseFilterValue/ParseFilterValue.ts'
import * as ChatDebugViewStates from '../State/ChatDebugViewStates.ts'
import { createDefaultState } from '../State/CreateDefaultState.ts'

const validEventCategoryFilters = new Set<string>([
  EventCategoryFilter.All,
  EventCategoryFilter.Network,
  EventCategoryFilter.Stream,
  EventCategoryFilter.Tools,
  EventCategoryFilter.Ui,
])

const getRestoredEventCategoryFilter = (savedState: Partial<SavedState>): string => {
  if (typeof savedState.eventCategoryFilter === 'string' && validEventCategoryFilters.has(savedState.eventCategoryFilter)) {
    return savedState.eventCategoryFilter
  }
  if (typeof savedState.filterValue === 'string') {
    return parseFilterValue(savedState.filterValue).eventCategoryFilter
  }
  return EventCategoryFilter.All
}

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
  const { filterValue, selectedEventId, timelineEndSeconds, timelineStartSeconds } = savedState
  const restoredEventCategoryFilter = getRestoredEventCategoryFilter(savedState)
  const state: ChatDebugViewState = {
    ...defaultState,
    assetDir,
    databaseName,
    dataBaseVersion,
    eventCategoryFilter: restoredEventCategoryFilter,
    eventStoreName,
    filterValue: filterValue ?? defaultState.filterValue,
    height,
    initial: true,
    platform,
    selectedEventId: selectedEventId ?? defaultState.selectedEventId,
    sessionId,
    sessionIdIndexName,
    timelineEndSeconds: timelineEndSeconds ?? defaultState.timelineEndSeconds,
    timelineStartSeconds: timelineStartSeconds ?? defaultState.timelineStartSeconds,
    uid,
    uri,
    width,
    x,
    y,
  }
  ChatDebugViewStates.set(uid, state, state)
}
