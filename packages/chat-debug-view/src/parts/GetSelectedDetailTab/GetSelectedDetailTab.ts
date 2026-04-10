import type { DetailTab } from '../DetailTab/DetailTab.ts'
import * as InputName from '../InputName/InputName.ts'

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
