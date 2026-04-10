export interface DetailTab {
  readonly isSelected: boolean
  readonly label: string
  readonly name: string
}

export { createDetailTabs } from '../CreateDetailTabs/CreateDetailTabs.ts'
export { getSelectedDetailTab } from '../GetSelectedDetailTab/GetSelectedDetailTab.ts'
export { hasDetailTab } from '../HasDetailTab/HasDetailTab.ts'
export { isDetailTab } from '../IsDetailTab/IsDetailTab.ts'
export { selectDetailTab } from '../SelectDetailTab/SelectDetailTab.ts'
