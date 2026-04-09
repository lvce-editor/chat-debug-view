import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { Network, Stream, Tools, Ui } from '../EventCategoryFilter/EventCategoryFilter.ts'

export const getEventCategoryFilterLabel = (eventCategoryFilter: string): string => {
  switch (eventCategoryFilter) {
    case Network:
      return ChatDebugStrings.network()
    case Stream:
      return ChatDebugStrings.stream()
    case Tools:
      return ChatDebugStrings.tools()
    case Ui:
      return ChatDebugStrings.ui()
    default:
      return ChatDebugStrings.all()
  }
}
