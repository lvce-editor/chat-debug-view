import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab } from '../DetailTab/DetailTab.ts'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import type { TableColumn } from '../TableColumn/TableColumn.ts'
import type { TableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

export interface ChatDebugViewState {
  readonly assetDir: string
  readonly categoryFilters: readonly CategoryFilter[]
  readonly databaseName: string
  readonly dataBaseVersion: number
  readonly detailTabs: readonly DetailTab[]
  readonly errorMessage: string
  readonly events: readonly ChatViewEvent[]
  readonly eventStoreName: string
  readonly filterValue: string
  readonly height: number
  readonly initial: boolean
  readonly largeBreakpoint: number
  readonly mediumBreakpoint: number
  readonly platform: number
  readonly focus: number
  readonly sashPointerActive: boolean
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
  readonly tableColumns: readonly TableColumn[]
  readonly tableColumnWidths: TableColumnWidths
  readonly tableResizerDownId: number
  readonly tableWidth: number
  readonly timelineEndSeconds: string
  readonly timelineEvents: readonly ChatViewEvent[]
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
  readonly visibleTableColumns: readonly string[]
  readonly width: number
  readonly x: number
  readonly y: number
}
