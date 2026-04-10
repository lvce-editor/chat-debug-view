export interface CategoryFilter {
  readonly isSelectedProperty: boolean
  readonly label: string
  readonly name: string
}

export { All, Network, Stream, Tools, Ui } from '../InputName/InputName.ts'
export { getEventCategoryFilterLabel } from '../GetEventCategoryFilterLabel/GetEventCategoryFilterLabel.ts'
import {
  createCategoryFilters as createCategoryFiltersBase,
  type EventCategoryFilterType,
  normalizeSelectedEventCategoryFilters,
} from '../CreateEventCategoryFilterOptions/CreateEventCategoryFilterOptions.ts'
import { All, Network, Stream, Tools, Ui } from '../InputName/InputName.ts'

export { type EventCategoryFilterType } from '../CreateEventCategoryFilterOptions/CreateEventCategoryFilterOptions.ts'

export const createCategoryFilters = (
  selectedEventCategoryFilter: EventCategoryFilterType | readonly EventCategoryFilterType[] = All,
): readonly CategoryFilter[] => {
  return createCategoryFiltersBase(selectedEventCategoryFilter)
}

export const isEventCategoryFilter = (value: string): value is EventCategoryFilterType => {
  return value === All || value === Tools || value === Network || value === Ui || value === Stream
}

export const getSelectedEventCategoryFilters = (categoryFilters: readonly CategoryFilter[]): readonly EventCategoryFilterType[] => {
  const selectedCategoryFilters = categoryFilters.filter((categoryFilter) => categoryFilter.isSelectedProperty)
  const selectedEventCategoryFilters = selectedCategoryFilters
    .map((categoryFilter) => categoryFilter.name)
    .filter((name): name is EventCategoryFilterType => isEventCategoryFilter(name))
  return normalizeSelectedEventCategoryFilters(selectedEventCategoryFilters)
}

export const getSelectedEventCategoryFilter = (categoryFilters: readonly CategoryFilter[]): EventCategoryFilterType => {
  const selectedEventCategoryFilters = getSelectedEventCategoryFilters(categoryFilters)
  if (selectedEventCategoryFilters.length === 1) {
    return selectedEventCategoryFilters[0]
  }
  return All
}

export const selectCategoryFilters = (
  categoryFilters: readonly CategoryFilter[],
  selectedEventCategoryFilters: readonly string[],
): readonly CategoryFilter[] => {
  const normalizedSelectedEventCategoryFilters = normalizeSelectedEventCategoryFilters(
    selectedEventCategoryFilters.filter((value): value is EventCategoryFilterType => isEventCategoryFilter(value)),
  )
  return categoryFilters.map((categoryFilter) => {
    const isSelectedProperty = normalizedSelectedEventCategoryFilters.includes(categoryFilter.name as EventCategoryFilterType)
    if (categoryFilter.isSelectedProperty === isSelectedProperty) {
      return categoryFilter
    }
    return {
      ...categoryFilter,
      isSelectedProperty,
    }
  })
}

export const selectCategoryFilter = (
  categoryFilters: readonly CategoryFilter[],
  selectedEventCategoryFilter: string,
  additive = false,
): readonly CategoryFilter[] => {
  if (!isEventCategoryFilter(selectedEventCategoryFilter)) {
    return categoryFilters
  }
  if (!additive || selectedEventCategoryFilter === All) {
    return selectCategoryFilters(categoryFilters, [selectedEventCategoryFilter])
  }
  const selectedEventCategoryFilters = getSelectedEventCategoryFilters(categoryFilters).filter((value) => value !== All)
  const nextSelectedEventCategoryFilters = selectedEventCategoryFilters.includes(selectedEventCategoryFilter)
    ? selectedEventCategoryFilters.filter((value) => value !== selectedEventCategoryFilter)
    : [...selectedEventCategoryFilters, selectedEventCategoryFilter]
  if (nextSelectedEventCategoryFilters.length === 0) {
    return selectCategoryFilters(categoryFilters, [All])
  }
  return selectCategoryFilters(categoryFilters, nextSelectedEventCategoryFilters)
}
