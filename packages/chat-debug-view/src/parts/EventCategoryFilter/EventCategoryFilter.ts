export interface EventCategoryFilterOption {
  readonly label: string
  readonly value: string
}

export { All, Network, Stream, Tools, Ui } from '../InputName/InputName.ts'
export { createEventCategoryFilterOptions } from '../CreateEventCategoryFilterOptions/CreateEventCategoryFilterOptions.ts'
export { getEventCategoryFilterLabel } from '../GetEventCategoryFilterLabel/GetEventCategoryFilterLabel.ts'
