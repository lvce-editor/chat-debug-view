export interface SavedState {
  readonly eventCategoryFilter: string
  readonly filterValue: string
  readonly selectedEventId: number | null
  readonly sessionId: string
  readonly selectedDetailTab: string
  readonly timelineEndSeconds: string
  readonly timelineStartSeconds: string
}
