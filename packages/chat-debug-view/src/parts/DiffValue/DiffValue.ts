import { InputSource } from '@lvce-editor/constants'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const isEqual = (oldState: ChatDebugViewState, newState: ChatDebugViewState): boolean => {
  // @ts-ignore
  return newState.inputSource === InputSource.User || oldState.filterValue === newState.filterValue
}
