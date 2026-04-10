import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import * as InputName from '../InputName/InputName.ts'

export interface DetailTab {
  readonly label: string
  readonly name: string
}

export const createDetailTabs = (): readonly DetailTab[] => {
  return [
    {
      label: ChatDebugStrings.preview(),
      name: InputName.Preview,
    },
    {
      label: ChatDebugStrings.payload(),
      name: InputName.Payload,
    },
    {
      label: ChatDebugStrings.response(),
      name: InputName.Response,
    },
    {
      label: ChatDebugStrings.timing(),
      name: InputName.Timing,
    },
  ]
}

export const isDetailTab = (value: string): boolean => {
  return value === InputName.Response || value === InputName.Preview || value === InputName.Payload || value === InputName.Timing
}

export const hasDetailTab = (detailTabs: readonly DetailTab[], value: string): boolean => {
  return detailTabs.some((detailTab) => detailTab.name === value)
}

export const getSelectedDetailTab = (detailTabs: readonly DetailTab[], selectedDetailTab: string): string => {
  if (hasDetailTab(detailTabs, selectedDetailTab)) {
    return selectedDetailTab
  }
  const responseTab = detailTabs.find((detailTab) => detailTab.name === InputName.Response)
  if (responseTab) {
    return responseTab.name
  }
  return detailTabs[0]?.name ?? selectedDetailTab
}
