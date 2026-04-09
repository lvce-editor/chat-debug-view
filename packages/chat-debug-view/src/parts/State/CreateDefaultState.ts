import type { ChatDebugViewState } from './ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { defaultTableWidth } from '../SplitLayout/SplitLayout.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'

export const createDefaultState = (): ChatDebugViewState => {
  return {
    assetDir: '',
    databaseName: 'lvce-chat-view-sessions',
    dataBaseVersion: 2,
    errorMessage: '',
    eventCategoryFilter: EventCategoryFilter.All,
    eventCategoryFilterOptions: EventCategoryFilter.createEventCategoryFilterOptions(),
    events: [],
    eventStoreName: 'chat-view-events',
    filterValue: '',
    height: 0,
    initial: false,
    platform: 0,
    selectedDetailTab: DetailTab.Response,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId: '',
    sessionIdIndexName: 'sessionId',
    showEventStreamFinishedEvents: false,
    showInputEvents: false,
    showResponsePartEvents: false,
    tableWidth: defaultTableWidth,
    timelineEndSeconds: '',
    timelineSelectionActive: false,
    timelineSelectionAnchorSeconds: '',
    timelineSelectionFocusSeconds: '',
    timelineStartSeconds: '',
    uid: 0,
    uri: '',
    useDevtoolsLayout: true,
    visibleTableColumns: defaultVisibleTableColumns,
    width: 0,
    x: 0,
    y: 0,
  }
}
