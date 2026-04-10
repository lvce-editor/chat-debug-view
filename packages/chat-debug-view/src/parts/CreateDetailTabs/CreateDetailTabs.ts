import type { DetailTab } from '../DetailTab/DetailTab.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import * as GetSafeSelectedDetailTab from '../GetSafeSelectedDetailTab/GetSafeSelectedDetailTab.ts'
import * as InputName from '../InputName/InputName.ts'

export const createDetailTabs = (selectedDetailTab = InputName.Response): readonly DetailTab[] => {
  const safeSelectedDetailTab = GetSafeSelectedDetailTab.getSafeSelectedDetailTab(selectedDetailTab)
  return [
    {
      isSelected: safeSelectedDetailTab === InputName.Preview,
      label: ChatDebugStrings.preview(),
      name: InputName.Preview,
    },
    {
      isSelected: safeSelectedDetailTab === InputName.Payload,
      label: ChatDebugStrings.payload(),
      name: InputName.Payload,
    },
    {
      isSelected: safeSelectedDetailTab === InputName.Response,
      label: ChatDebugStrings.response(),
      name: InputName.Response,
    },
    {
      isSelected: safeSelectedDetailTab === InputName.Timing,
      label: ChatDebugStrings.timing(),
      name: InputName.Timing,
    },
  ]
}
