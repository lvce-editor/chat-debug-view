import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { All, Network, Stream, Tools, Ui } from '../EventCategoryFilter/EventCategoryFilter.ts'

export type EventCategoryFilterType = typeof All | typeof Tools | typeof Network | typeof Ui | typeof Stream

const eventCategoryFilters = [All, Tools, Network, Ui, Stream] as const

export const normalizeSelectedEventCategoryFilters = (
  selectedEventCategoryFilter: EventCategoryFilterType | readonly EventCategoryFilterType[] = All,
): readonly EventCategoryFilterType[] => {
  const selectedEventCategoryFilters = Array.isArray(selectedEventCategoryFilter)
    ? selectedEventCategoryFilter
    : [selectedEventCategoryFilter]
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

export const createCategoryFilters = (
  selectedEventCategoryFilter: EventCategoryFilterType | readonly EventCategoryFilterType[] = All,
): readonly CategoryFilter[] => {
  const selectedEventCategoryFilters = normalizeSelectedEventCategoryFilters(selectedEventCategoryFilter)
  return [
    {
      isSelectedProperty: selectedEventCategoryFilters.includes(All),
      label: ChatDebugStrings.all(),
      name: All,
    },
    {
      isSelectedProperty: selectedEventCategoryFilters.includes(Tools),
      label: ChatDebugStrings.tools(),
      name: Tools,
    },
    {
      isSelectedProperty: selectedEventCategoryFilters.includes(Network),
      label: ChatDebugStrings.network(),
      name: Network,
    },
    {
      isSelectedProperty: selectedEventCategoryFilters.includes(Ui),
      label: ChatDebugStrings.ui(),
      name: Ui,
    },
    {
      isSelectedProperty: selectedEventCategoryFilters.includes(Stream),
      label: ChatDebugStrings.stream(),
      name: Stream,
    },
  ]
}
