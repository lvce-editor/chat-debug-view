import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as InputName from '../InputName/InputName.ts'
import { withPreservedSelection } from '../PreserveSelection/PreserveSelection.ts'

export const handleInput = (state: ChatDebugViewState, name: string, value: string, _checked: string | boolean): ChatDebugViewState => {
  if (name === InputName.Filter) {
    const nextState = {
      ...state,
      filterValue: value,
    }
    return withPreservedSelection(state, nextState)
  }
  return state
}
