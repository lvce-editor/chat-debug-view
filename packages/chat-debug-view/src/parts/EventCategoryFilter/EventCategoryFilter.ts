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
} from '../CreateEventCategoryFilterOptions/CreateEventCategoryFilterOptions.ts'
import { All, Network, Stream, Tools, Ui } from '../InputName/InputName.ts'

export { type EventCategoryFilterType } from '../CreateEventCategoryFilterOptions/CreateEventCategoryFilterOptions.ts'

export const createCategoryFilters = (selectedEventCategoryFilter = All): readonly CategoryFilter[] => {
  return createCategoryFiltersBase(selectedEventCategoryFilter)
}

export const isEventCategoryFilter = (value: string): value is EventCategoryFilterType => {
  return value === All || value === Tools || value === Network || value === Ui || value === Stream
}

export const getSelectedEventCategoryFilter = (categoryFilters: readonly CategoryFilter[]): EventCategoryFilterType => {
  const selectedCategoryFilter = categoryFilters.find((categoryFilter) => categoryFilter.isSelectedProperty)
  if (selectedCategoryFilter && isEventCategoryFilter(selectedCategoryFilter.name)) {
    return selectedCategoryFilter.name
  }
  const allCategoryFilter = categoryFilters.find((categoryFilter) => categoryFilter.name === All)
  if (allCategoryFilter) {
    return All
  }
  return All
}

export const selectCategoryFilter = (categoryFilters: readonly CategoryFilter[], selectedEventCategoryFilter: string): readonly CategoryFilter[] => {
  if (!isEventCategoryFilter(selectedEventCategoryFilter)) {
    return categoryFilters
  }
  return categoryFilters.map((categoryFilter) => {
    const isSelectedProperty = categoryFilter.name === selectedEventCategoryFilter
    if (categoryFilter.isSelectedProperty === isSelectedProperty) {
      return categoryFilter
    }
    return {
      ...categoryFilter,
      isSelectedProperty,
    }
  })
}
