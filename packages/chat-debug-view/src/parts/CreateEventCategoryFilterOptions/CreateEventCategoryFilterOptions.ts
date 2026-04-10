import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { All, Network, Stream, Tools, Ui } from '../EventCategoryFilter/EventCategoryFilter.ts'

export type EventCategoryFilterType = typeof All | typeof Tools | typeof Network | typeof Ui | typeof Stream

export const createCategoryFilters = (selectedEventCategoryFilter = All): readonly CategoryFilter[] => {
  return [
    {
      isSelectedProperty: selectedEventCategoryFilter === All,
      label: ChatDebugStrings.all(),
      name: All,
    },
    {
      isSelectedProperty: selectedEventCategoryFilter === Tools,
      label: ChatDebugStrings.tools(),
      name: Tools,
    },
    {
      isSelectedProperty: selectedEventCategoryFilter === Network,
      label: ChatDebugStrings.network(),
      name: Network,
    },
    {
      isSelectedProperty: selectedEventCategoryFilter === Ui,
      label: ChatDebugStrings.ui(),
      name: Ui,
    },
    {
      isSelectedProperty: selectedEventCategoryFilter === Stream,
      label: ChatDebugStrings.stream(),
      name: Stream,
    },
  ]
}
