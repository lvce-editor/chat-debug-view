import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab } from '../DetailTab/DetailTab.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import * as GetSafeSelectedDetailTab from '../GetSafeSelectedDetailTab/GetSafeSelectedDetailTab.ts'
import { hasTimingDetails } from '../HasTimingDetails/HasTimingDetails.ts'
import * as InputName from '../InputName/InputName.ts'

export const createDetailTabs = (selectedDetailTab = InputName.Response, event?: ChatViewEvent | null): readonly DetailTab[] => {
  const hasTimingTab = event ? hasTimingDetails(event) : true
  const safeSelectedDetailTab = GetSafeSelectedDetailTab.getSafeSelectedDetailTab(selectedDetailTab)
  const normalizedSelectedDetailTab = hasTimingTab || safeSelectedDetailTab !== InputName.Timing ? safeSelectedDetailTab : InputName.Response
  const detailTabs: DetailTab[] = [
    {
      isSelected: normalizedSelectedDetailTab === InputName.Preview,
      label: ChatDebugStrings.preview(),
      name: InputName.Preview,
    },
    {
      isSelected: normalizedSelectedDetailTab === InputName.Payload,
      label: ChatDebugStrings.payload(),
      name: InputName.Payload,
    },
    {
      isSelected: normalizedSelectedDetailTab === InputName.Response,
      label: ChatDebugStrings.response(),
      name: InputName.Response,
    },
  ]
  if (hasTimingTab) {
    detailTabs.push({
      isSelected: normalizedSelectedDetailTab === InputName.Timing,
      label: ChatDebugStrings.timing(),
      name: InputName.Timing,
    })
  }
  return detailTabs
}
