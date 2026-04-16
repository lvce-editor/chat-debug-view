import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { withPreservedSelection } from '../PreserveSelection/WithPreservedSelection/WithPreservedSelection.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const handleTableHeaderClick = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  const { sortColumn, sortDescending } = state
  if (!TableColumn.isTableColumn(value)) {
    return state
  }
  const newSortDescending = sortColumn === value ? !sortDescending : false
  const nextState = {
    ...state,
    sortColumn: value,
    sortDescending: newSortDescending,
  }
  return withPreservedSelection(state, nextState)
}
