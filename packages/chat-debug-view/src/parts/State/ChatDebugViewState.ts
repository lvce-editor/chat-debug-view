import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { EventCategoryFilterOption } from '../EventCategoryFilter/EventCategoryFilter.ts'

export interface ChatDebugViewState {
  readonly assetDir: string
  readonly databaseName: string
  readonly dataBaseVersion: number
  readonly errorMessage: string
  readonly eventCategoryFilter: string
  readonly eventCategoryFilterOptions: readonly EventCategoryFilterOption[]
  readonly events: readonly ChatViewEvent[]
  readonly eventStoreName: string
  readonly filterValue: string
  readonly height: number
  readonly indexedDbSupportOverride: boolean | undefined
  readonly initial: boolean
  readonly platform: number
  readonly selectedEvent: ChatViewEvent | null
  readonly selectedDetailTab: string
  readonly selectedEventId: number | null
  readonly selectedEventIndex: number | null
  readonly sessionId: string
  readonly sessionIdIndexName: string
  readonly showEventStreamFinishedEvents: boolean
  readonly showInputEvents: boolean
  readonly showResponsePartEvents: boolean
  readonly tableWidth: number
  readonly timelineEndSeconds: string
  readonly timelineSelectionActive: boolean
  readonly timelineSelectionAnchorSeconds: string
  readonly timelineSelectionFocusSeconds: string
  readonly timelineStartSeconds: string
  readonly uid: number
  readonly uri: string
  readonly useDevtoolsLayout: boolean
  readonly width: number
  readonly x: number
  readonly y: number
}
