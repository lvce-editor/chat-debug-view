import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { All, Network, Stream, Tools, Ui } from '../EventCategoryFilter/EventCategoryFilter.ts'

export const createCategoryFilters = (): readonly CategoryFilter[] => {
  return [
    {
      label: ChatDebugStrings.all(),
      name: All,
    },
    {
      label: ChatDebugStrings.tools(),
      name: Tools,
    },
    {
      label: ChatDebugStrings.network(),
      name: Network,
    },
    {
      label: ChatDebugStrings.ui(),
      name: Ui,
    },
    {
      label: ChatDebugStrings.stream(),
      name: Stream,
    },
  ]
}
