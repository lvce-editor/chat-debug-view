export const Response = 'response'
export const Preview = 'preview'
export const Timing = 'timing'

export const detailTabs = [Response, Preview, Timing] as const

export const isDetailTab = (value: string): boolean => {
  return value === Response || value === Preview || value === Timing
}

export const getDetailTabLabel = (value: string): string => {
  if (value === Preview) {
    return 'Preview'
  }
  if (value === Timing) {
    return 'Timing'
  }
  return 'Response'
}
