import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

export const Response = 'response'
export const Preview = 'preview'
export const Timing = 'timing'

export const detailTabs = [Preview, Response, Timing] as const

export const isDetailTab = (value: string): boolean => {
  return value === Response || value === Preview || value === Timing
}

export const getDetailTabLabel = (value: string): string => {
  if (value === Preview) {
    return ChatDebugStrings.preview()
  }
  if (value === Timing) {
    return ChatDebugStrings.timing()
  }
  return ChatDebugStrings.response()
}
