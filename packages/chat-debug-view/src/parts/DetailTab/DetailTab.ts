import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import * as InputName from '../InputName/InputName.ts'

export interface DetailTab {
  readonly isSelected: boolean
  readonly label: string
  readonly name: string
}

const getSafeSelectedDetailTab = (selectedDetailTab: string): string => {
  return isDetailTab(selectedDetailTab) ? selectedDetailTab : InputName.Response
}

export const createDetailTabs = (selectedDetailTab = InputName.Response): readonly DetailTab[] => {
  const safeSelectedDetailTab = getSafeSelectedDetailTab(selectedDetailTab)
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

export const isDetailTab = (value: string): boolean => {
  return value === InputName.Response || value === InputName.Preview || value === InputName.Payload || value === InputName.Timing
}

export const hasDetailTab = (detailTabs: readonly DetailTab[], value: string): boolean => {
  return detailTabs.some((detailTab) => detailTab.name === value)
}

export const getSelectedDetailTab = (detailTabs: readonly DetailTab[]): string => {
  const selectedDetailTab = detailTabs.find((detailTab) => detailTab.isSelected)
  if (selectedDetailTab) {
    return selectedDetailTab.name
  }
  const responseTab = detailTabs.find((detailTab) => detailTab.name === InputName.Response)
  if (responseTab) {
    return responseTab.name
  }
  return detailTabs[0]?.name ?? InputName.Response
}

export const selectDetailTab = (detailTabs: readonly DetailTab[], selectedDetailTab: string): readonly DetailTab[] => {
  if (!hasDetailTab(detailTabs, selectedDetailTab)) {
    return detailTabs
  }
  return detailTabs.map((detailTab) => {
    const isSelectedProperty = detailTab.name === selectedDetailTab
    if (detailTab.isSelected === isSelectedProperty) {
      return detailTab
    }
    return {
      ...detailTab,
      isSelected: isSelectedProperty,
    }
  })
}
