export const All = 'all'
export const Tools = 'tools'
export const Network = 'network'
export const Ui = 'ui'
export const Stream = 'stream'

export interface EventCategoryFilterOption {
  readonly label: string
  readonly value: string
}

export const createEventCategoryFilterOptions = (): readonly EventCategoryFilterOption[] => {
  return [
    {
      label: 'All',
      value: All,
    },
    {
      label: 'Tools',
      value: Tools,
    },
    {
      label: 'Network',
      value: Network,
    },
    {
      label: 'UI',
      value: Ui,
    },
    {
      label: 'Stream',
      value: Stream,
    },
  ]
}

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
