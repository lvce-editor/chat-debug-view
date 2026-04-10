import type { ChatDebugViewState } from './ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { emptyTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import * as InputName from '../InputName/InputName.ts'
import { defaultTableWidth } from '../SplitLayout/SplitLayout.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'
import { defaultTableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

export const createDefaultState = (): ChatDebugViewState => {
  return {
    assetDir: '',
    categoryFilters: [],
    databaseName: 'lvce-chat-view-sessions',
    dataBaseVersion: 2,
    detailTabs: [],
    errorMessage: '',
    eventCategoryFilter: EventCategoryFilter.All,
    events: [],
    eventStoreName: 'chat-view-events',
    filterValue: '',
    height: 0,
    initial: false,
    platform: 0,
    selectedDetailTab: InputName.Response,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId: '',
    sessionIdIndexName: 'sessionId',
    showEventStreamFinishedEvents: false,
    showInputEvents: false,
    showResponsePartEvents: false,
    tableColumns: [],
    tableColumnWidths: defaultTableColumnWidths,
    tableResizerDownId: 0,
    tableWidth: defaultTableWidth,
    timelineEndSeconds: '',
    timelineEvents: [],
    timelineInfo: emptyTimelineInfo,
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
