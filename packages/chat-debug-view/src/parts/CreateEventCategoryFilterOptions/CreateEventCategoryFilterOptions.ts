import type { EventCategoryFilterOption } from '../EventCategoryFilter/EventCategoryFilter.ts'
import { All, Network, Stream, Tools, Ui } from '../EventCategoryFilter/EventCategoryFilter.ts'

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
