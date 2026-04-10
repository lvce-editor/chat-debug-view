import type { DetailTab } from '../DetailTab/DetailTab.ts'

export const hasDetailTab = (detailTabs: readonly DetailTab[], value: string): boolean => {
  return detailTabs.some((detailTab) => detailTab.name === value)
}
