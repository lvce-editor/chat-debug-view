import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { All, Network, Stream, Tools, Ui } from '../EventCategoryFilter/EventCategoryFilter.ts'

export type EventCategoryFilterType = typeof All | typeof Tools | typeof Network | typeof Ui | typeof Stream

const eventCategoryFilters = [All, Tools, Network, Ui, Stream] as const

export const normalizeSelectedEventCategoryFilters = (
  selectedEventCategoryFilter: string | readonly string[] = All,
): readonly EventCategoryFilterType[] => {
  const selectedEventCategoryFilters = Array.isArray(selectedEventCategoryFilter) ? selectedEventCategoryFilter : [selectedEventCategoryFilter]
  const uniqueSelectedEventCategoryFilters = [...new Set(selectedEventCategoryFilters)]
  const validSelectedEventCategoryFilters = uniqueSelectedEventCategoryFilters.filter((value): value is EventCategoryFilterType => {
    return eventCategoryFilters.includes(value)
  })
  if (validSelectedEventCategoryFilters.length === 0) {
    return [All]
  }
  if (validSelectedEventCategoryFilters.includes(All)) {
    return [All]
  }
  return validSelectedEventCategoryFilters
}

export const createCategoryFilters = (selectedEventCategoryFilter: string | readonly string[] = All): readonly CategoryFilter[] => {
  const selectedEventCategoryFilters = normalizeSelectedEventCategoryFilters(selectedEventCategoryFilter)
  return [
    {
      isSelected: selectedEventCategoryFilters.includes(All),
      label: ChatDebugStrings.all(),
      name: All,
    },
    {
      isSelected: selectedEventCategoryFilters.includes(Tools),
      label: ChatDebugStrings.tools(),
      name: Tools,
    },
    {
      isSelected: selectedEventCategoryFilters.includes(Network),
      label: ChatDebugStrings.network(),
      name: Network,
    },
    {
      isSelected: selectedEventCategoryFilters.includes(Ui),
      label: ChatDebugStrings.ui(),
      name: Ui,
    },
    {
      isSelected: selectedEventCategoryFilters.includes(Stream),
      label: ChatDebugStrings.stream(),
      name: Stream,
    },
  ]
}
