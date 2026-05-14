import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab } from '../DetailTab/DetailTab.ts'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import type { HeaderSectionKey } from '../HeaderSectionKey/HeaderSectionKey.ts'
import type { TableColumn } from '../TableColumn/TableColumn.ts'

export interface ChatDebugViewState {
  readonly assetDir: string
  readonly categoryFilters: readonly CategoryFilter[]
  readonly collapsedHeaderSections: readonly HeaderSectionKey[]
  readonly databaseName: string
  readonly dataBaseVersion: number
  readonly defaultTableWidth: number
  readonly detailTabs: readonly DetailTab[]
  readonly devtoolsRootGap: number
  readonly devtoolsTimelineHeight: number
  readonly devtoolsTopHeight: number
  readonly errorMessage: string
  readonly events: readonly ChatViewEvent[]
  readonly eventStoreName: string
  readonly filterValue: string
  readonly focus: number
  readonly height: number
  readonly horizontalPadding: number
  readonly initial: boolean
  readonly largeBreakpoint: number
  readonly leftPadding: number
  readonly mediumBreakpoint: number
  readonly minDetailsWidth: number
  readonly minTableWidth: number
  readonly platform: number
  readonly previewTextCursorColumnIndex: number | null
  readonly previewTextCursorRowIndex: number | null
  readonly previewTextDeltaY: number
  readonly previewTextScrollBarHandleOffset: number
  readonly previewTextScrollBarPointerActive: boolean
  readonly sashPointerActive: boolean
  readonly sashWidth: number
  readonly selectedEvent: ChatViewEvent | null
  readonly selectedEventId: number | null
  readonly selectedEventIndex: number | null
  readonly sessionId: string
  readonly sessionIdIndexName: string
  readonly showEventStreamFinishedEvents: boolean
  readonly showInputEvents: boolean
  readonly showResponsePartEvents: boolean
  readonly sortColumn: TableColumn['name'] | ''
  readonly sortDescending: boolean
  readonly summaries: readonly string[]
  readonly tableColumns: readonly TableColumn[]
  readonly tableDeltaY: number
  readonly tableMaxLineY: number
  readonly tableMinLineY: number
  readonly tableResizerDownId: number
  readonly tableScrollBarHandleOffset: number
  readonly tableScrollBarPointerActive: boolean
  readonly tableWidth: number
  readonly tableWidthManuallyResized: boolean
  readonly timelineEndSeconds: string
  readonly timelineEvents: readonly ChatViewEvent[]
  readonly timelineFilterDescription: string
  readonly timelineHeight: number
  readonly timelineHorizontalPadding: number
  readonly timelineHoverPercent: number | null
  readonly timelineHoverSeconds: string
  readonly timelineInfo: TimelineInfo
  readonly timelineSelectionActive: boolean
  readonly timelineSelectionAnchorSeconds: string
  readonly timelineSelectionFocusSeconds: string
  readonly timelineStartSeconds: string
  readonly uid: number
  readonly uri: string
  readonly useDevtoolsLayout: boolean
  readonly viewPadding: number
  readonly width: number
  readonly x: number
  readonly y: number
}
