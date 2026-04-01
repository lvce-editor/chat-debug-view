import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'

const RE_SPACE = /\s+/

const tokenToEventCategoryFilter = new Map<string, string>([
  ['@tools', EventCategoryFilter.Tools],
  ['@network', EventCategoryFilter.Network],
  ['@ui', EventCategoryFilter.Ui],
  ['@stream', EventCategoryFilter.Stream],
])

export const parseFilterValue = (filterValue: string): { readonly eventCategoryFilter: string; readonly filterText: string } => {
  const normalizedFilter = filterValue.trim().toLowerCase()
  if (!normalizedFilter) {
    return {
      eventCategoryFilter: EventCategoryFilter.All,
      filterText: '',
    }
  }
  const parts = normalizedFilter.split(RE_SPACE)
  const eventCategoryFilter = parts.map((part) => tokenToEventCategoryFilter.get(part)).find(Boolean) || EventCategoryFilter.All
  const filterText = parts.filter((part) => !tokenToEventCategoryFilter.has(part)).join(' ')
  return {
    eventCategoryFilter,
    filterText,
  }
}
