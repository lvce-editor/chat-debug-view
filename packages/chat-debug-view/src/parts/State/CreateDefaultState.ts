import type { ChatDebugViewState } from './ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { defaultTableWidth } from '../SplitLayout/SplitLayout.ts'

export const createDefaultState = (): ChatDebugViewState => {
  return {
    assetDir: '',
    databaseName: 'lvce-chat-view-sessions',
    dataBaseVersion: 2,
    errorMessage: '',
    eventCategoryFilter: EventCategoryFilter.All,
    events: [],
    eventStoreName: 'chat-view-events',
    filterValue: '',
    height: 0,
    initial: false,
    platform: 0,
    selectedEvent: null,
    selectedEventIndex: null,
    sessionId: '',
    sessionIdIndexName: 'sessionId',
    showEventStreamFinishedEvents: false,
    showInputEvents: false,
    showResponsePartEvents: false,
    tableWidth: defaultTableWidth,
    timelineEndSeconds: '',
    timelineStartSeconds: '',
    uid: 0,
    uri: '',
    useDevtoolsLayout: true,
    width: 0,
    x: 0,
    y: 0,
  }
}
