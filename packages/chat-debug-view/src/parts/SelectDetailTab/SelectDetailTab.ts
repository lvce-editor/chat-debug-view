import type { DetailTab } from '../DetailTab/DetailTab.ts'
import * as HasDetailTab from '../HasDetailTab/HasDetailTab.ts'

export const selectDetailTab = (detailTabs: readonly DetailTab[], selectedDetailTab: string): readonly DetailTab[] => {
  if (!HasDetailTab.hasDetailTab(detailTabs, selectedDetailTab)) {
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
