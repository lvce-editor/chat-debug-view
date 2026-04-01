export const Response = 'response'
export const Timing = 'timing'

export const detailTabs = [Response, Timing] as const

export const isDetailTab = (value: string): boolean => {
  return value === Response || value === Timing
}

export const getDetailTabLabel = (value: string): string => {
  if (value === Timing) {
    return 'Timing'
  }
  return 'Response'
}
