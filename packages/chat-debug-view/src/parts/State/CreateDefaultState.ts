import type { ChatDebugViewState } from './ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { emptyTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { defaultTableWidth } from '../SplitLayout/SplitLayout.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'
import { defaultTableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

export const createDefaultState = (): ChatDebugViewState => {
  return {
    assetDir: '',
    categoryFilters: EventCategoryFilter.createCategoryFilters(),
    databaseName: 'lvce-chat-view-sessions',
    dataBaseVersion: 2,
    detailTabs: DetailTab.createDetailTabs(),
    errorMessage: '',
    events: [],
    eventStoreName: 'chat-view-events',
    filterValue: '',
    height: 0,
    initial: false,
    platform: 0,
    sashPointerActive: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId: '',
    sessionIdIndexName: 'sessionId',
    showEventStreamFinishedEvents: false,
    showInputEvents: false,
    showResponsePartEvents: false,
    sortColumn: '',
    sortDescending: false,
    tableColumns: [],
    tableColumnWidths: defaultTableColumnWidths,
    tableResizerDownId: 0,
    tableWidth: defaultTableWidth,
    timelineEndSeconds: '',
    timelineEvents: [],
    timelineHoverPercent: null,
    timelineHoverSeconds: '',
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
