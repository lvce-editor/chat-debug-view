import type { EventCategoryFilterOption } from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { All, Network, Stream, Tools, Ui } from '../EventCategoryFilter/EventCategoryFilter.ts'

export const createEventCategoryFilterOptions = (): readonly EventCategoryFilterOption[] => {
  return [
    {
      label: ChatDebugStrings.all(),
      value: All,
    },
    {
      label: ChatDebugStrings.tools(),
      value: Tools,
    },
    {
      label: ChatDebugStrings.network(),
      value: Network,
    },
    {
      label: ChatDebugStrings.ui(),
      value: Ui,
    },
    {
      label: ChatDebugStrings.stream(),
      value: Stream,
    },
  ]
}
