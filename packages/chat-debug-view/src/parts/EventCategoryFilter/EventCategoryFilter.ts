export interface CategoryFilter {
  readonly label: string
  readonly name: string
}

export { All, Network, Stream, Tools, Ui } from '../InputName/InputName.ts'
export { createCategoryFilters } from '../CreateEventCategoryFilterOptions/CreateEventCategoryFilterOptions.ts'
export { getEventCategoryFilterLabel } from '../GetEventCategoryFilterLabel/GetEventCategoryFilterLabel.ts'
