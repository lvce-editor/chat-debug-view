import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import * as InputName from '../InputName/InputName.ts'

export const detailTabs = [InputName.Preview, InputName.Response, InputName.Timing] as const

export const isDetailTab = (value: string): boolean => {
  return value === InputName.Response || value === InputName.Preview || value === InputName.Timing
}

export const getDetailTabLabel = (value: string): string => {
  if (value === InputName.Preview) {
    return ChatDebugStrings.preview()
  }
  if (value === InputName.Timing) {
    return ChatDebugStrings.timing()
  }
  return ChatDebugStrings.response()
}
