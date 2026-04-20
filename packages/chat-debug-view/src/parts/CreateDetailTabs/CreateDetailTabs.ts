import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab } from '../DetailTab/DetailTab.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import * as GetSafeSelectedDetailTab from '../GetSafeSelectedDetailTab/GetSafeSelectedDetailTab.ts'
import { hasHeadersDetails } from '../HasHeadersDetails/HasHeadersDetails.ts'
import { hasTimingDetails } from '../HasTimingDetails/HasTimingDetails.ts'
import * as InputName from '../InputName/InputName.ts'

export const createDetailTabs = (selectedDetailTab = InputName.Response, event?: ChatViewEvent | null): readonly DetailTab[] => {
  const hasHeadersTab = event ? hasHeadersDetails(event) : false
  const hasTimingTab = event ? hasTimingDetails(event) : true
  const safeSelectedDetailTab = GetSafeSelectedDetailTab.getSafeSelectedDetailTab(selectedDetailTab)
  const availableTabs = [
    InputName.Preview,
    InputName.Payload,
    InputName.Response,
    ...(hasHeadersTab ? [InputName.Headers] : []),
    ...(hasTimingTab ? [InputName.Timing] : []),
  ]
  const normalizedSelectedDetailTab = availableTabs.includes(safeSelectedDetailTab) ? safeSelectedDetailTab : InputName.Response
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
  if (hasHeadersTab) {
    detailTabs.push({
      isSelected: normalizedSelectedDetailTab === InputName.Headers,
      label: ChatDebugStrings.headers(),
      name: InputName.Headers,
    })
  }
  if (hasTimingTab) {
    detailTabs.push({
      isSelected: normalizedSelectedDetailTab === InputName.Timing,
      label: ChatDebugStrings.timing(),
      name: InputName.Timing,
    })
  }
  return detailTabs
}
