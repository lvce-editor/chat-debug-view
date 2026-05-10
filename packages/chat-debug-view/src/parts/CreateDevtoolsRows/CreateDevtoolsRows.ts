import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DevtoolsRow } from '../DevtoolsRow/DevtoolsRow.ts'
import { hasErrorStatus } from '../HasErrorStatus/HasErrorStatus.ts'

export const createDevtoolsRows = (events: readonly ChatViewEvent[], selectedEventIndex: number | null, startIndex = 0): readonly DevtoolsRow[] => {
  return events.map((event, index) => {
    const actualIndex = startIndex + index
    return {
      event,
      index: actualIndex,
      isErrorStatus: hasErrorStatus(event),
      isEven: actualIndex % 2 === 1,
      isSelected: selectedEventIndex === actualIndex,
    }
  })
}
