import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab as DetailTabType } from '../DetailTab/DetailTab.ts'
import { createDetailTabs } from '../CreateDetailTabs/CreateDetailTabs.ts'
import { getSelectedDetailTab } from '../GetSelectedDetailTab/GetSelectedDetailTab.ts'

export const getNormalizedDetailTabs = (selectedEvent: ChatViewEvent | null, detailTabs: readonly DetailTabType[]): readonly DetailTabType[] => {
  if (selectedEvent === null) {
    return detailTabs
  }
  return createDetailTabs(getSelectedDetailTab(detailTabs), selectedEvent)
}
