import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { withPreservedSelection } from '../PreserveSelection/WithPreservedSelection/WithPreservedSelection.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const handleTableHeaderClick = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  if (!TableColumn.isTableColumn(value)) {
    return state
  }
  const sortDescending = state.sortColumn === value ? !state.sortDescending : false
  const nextState = {
    ...state,
    sortColumn: value,
    sortDescending,
  }
  return withPreservedSelection(state, nextState)
}
