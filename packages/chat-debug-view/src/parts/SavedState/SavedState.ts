import type { TableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

export interface SavedState {
  readonly eventCategoryFilter: string
  readonly filterValue: string
  readonly selectedDetailTab: string
  readonly selectedEventId: number | null
  readonly sessionId: string
  readonly tableColumnWidths: TableColumnWidths
  readonly timelineEndSeconds: string
  readonly timelineStartSeconds: string
  readonly visibleTableColumns: readonly string[]
}
