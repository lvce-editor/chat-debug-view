import type { ChatDebugViewState } from './ChatDebugViewState.ts'
import { createDetailTabs } from '../CreateDetailTabs/CreateDetailTabs.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { emptyTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'
import { defaultTableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

export const createDefaultState = (): ChatDebugViewState => {
  const defaultTableWidth = 480
  const minTableWidth = 240
  const minDetailsWidth = 280
  const sashWidth = 4
  const viewPadding = 8
  const timelineHorizontalPadding = 10
  const horizontalPadding = viewPadding * 2
  const leftPadding = viewPadding
  return {
    assetDir: '',
    categoryFilters: EventCategoryFilter.createCategoryFilters(),
    collapsedHeaderSections: [],
    databaseName: 'lvce-chat-view-sessions',
    dataBaseVersion: 2,
    defaultTableWidth,
    detailTabs: createDetailTabs(),
    devtoolsRootGap: 4,
    devtoolsTimelineHeight: 88,
    devtoolsTopHeight: 28,
    errorMessage: '',
    events: [],
    eventStoreName: 'chat-view-events',
    filterValue: '',
    focus: 0,
    height: 0,
    horizontalPadding,
    initial: false,
    largeBreakpoint: 900,
    leftPadding,
    mediumBreakpoint: 600,
    minDetailsWidth,
    minTableWidth,
    platform: 0,
    previewTextCursorColumnIndex: null,
    previewTextCursorRowIndex: null,
    previewTextDeltaY: 0,
    previewTextScrollBarHandleOffset: 0,
    previewTextScrollBarPointerActive: false,
    sashPointerActive: false,
    sashWidth,
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
    summaries: [],
    tableColumns: TableColumn.createTableColumns(),
    tableColumnWidths: defaultTableColumnWidths,
    tableDeltaY: 0,
    tableMaxLineY: 0,
    tableMinLineY: 0,
    tableResizerDownId: 0,
    tableScrollBarHandleOffset: 0,
    tableScrollBarPointerActive: false,
    tableWidth: defaultTableWidth,
    tableWidthManuallyResized: false,
    timelineEndSeconds: '',
    timelineEvents: [],
    timelineFilterDescription: '',
    timelineHeight: 81,
    timelineHorizontalPadding,
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
    viewPadding,
    width: 0,
    x: 0,
    y: 0,
  }
}
