import type { DetailTab } from '../DetailTab/DetailTab.ts'
import * as HasDetailTab from '../HasDetailTab/HasDetailTab.ts'

export const selectDetailTab = (detailTabs: readonly DetailTab[], selectedDetailTab: string): readonly DetailTab[] => {
  if (!HasDetailTab.hasDetailTab(detailTabs, selectedDetailTab)) {
    return detailTabs
  }
  return detailTabs.map((detailTab) => {
    return {
      ...detailTab,
      isSelected: detailTab.name === selectedDetailTab,
    }
  })
}
