export const All = 'all'
export const Tools = 'tools'
export const Network = 'network'
export const Ui = 'ui'
export const Stream = 'stream'

export const options = [
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
] as const

export const getEventCategoryFilterLabel = (eventCategoryFilter: string): string => {
  switch (eventCategoryFilter) {
    case Tools:
      return 'Tools'
    case Network:
      return 'Network'
    case Ui:
      return 'UI'
    case Stream:
      return 'Stream'
    default:
      return 'All'
  }
}