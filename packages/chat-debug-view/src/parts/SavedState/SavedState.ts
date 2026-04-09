export interface SavedState {
  readonly eventCategoryFilter: string
  readonly filterValue: string
  readonly selectedDetailTab: string
  readonly selectedEventId: number | null
  readonly sessionId: string
  readonly timelineEndSeconds: string
  readonly timelineStartSeconds: string
}
