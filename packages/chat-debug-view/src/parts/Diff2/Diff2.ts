import * as DiffModules from '../DiffModules/DiffModules.ts'
import * as ChatDebugViewStates from '../State/ChatDebugViewStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  return ChatDebugViewStates.diff(uid, DiffModules.modules, DiffModules.numbers)
}
