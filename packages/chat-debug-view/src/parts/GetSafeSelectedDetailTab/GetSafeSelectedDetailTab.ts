import * as InputName from '../InputName/InputName.ts'
import * as IsDetailTab from '../IsDetailTab/IsDetailTab.ts'

export const getSafeSelectedDetailTab = (selectedDetailTab: string): string => {
  return IsDetailTab.isDetailTab(selectedDetailTab) ? selectedDetailTab : InputName.Response
}
