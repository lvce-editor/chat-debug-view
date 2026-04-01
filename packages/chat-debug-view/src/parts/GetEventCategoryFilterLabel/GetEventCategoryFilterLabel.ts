import { Network, Stream, Tools, Ui } from '../EventCategoryFilter/EventCategoryFilter.ts'

export const getEventCategoryFilterLabel = (eventCategoryFilter: string): string => {
  switch (eventCategoryFilter) {
    case Network:
      return 'Network'
    case Stream:
      return 'Stream'
    case Tools:
      return 'Tools'
    case Ui:
      return 'UI'
    default:
      return 'All'
  }
}
