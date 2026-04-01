export const All = 'all'
export const Tools = 'tools'
export const Network = 'network'
export const Ui = 'ui'
export const Stream = 'stream'

export interface EventCategoryFilterOption {
  readonly label: string
  readonly value: string
}

export { createEventCategoryFilterOptions } from '../CreateEventCategoryFilterOptions/CreateEventCategoryFilterOptions.ts'
export { getEventCategoryFilterLabel } from '../GetEventCategoryFilterLabel/GetEventCategoryFilterLabel.ts'
