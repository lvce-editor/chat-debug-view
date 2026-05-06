import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab as DetailTabType } from '../DetailTab/DetailTab.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'

export const getNormalizedDetailTabs = (selectedEvent: ChatViewEvent | null, detailTabs: readonly DetailTabType[]): readonly DetailTabType[] => {
  if (selectedEvent === null) {
    return detailTabs
  }
  return DetailTab.createDetailTabs(DetailTab.getSelectedDetailTab(detailTabs), selectedEvent)
}
