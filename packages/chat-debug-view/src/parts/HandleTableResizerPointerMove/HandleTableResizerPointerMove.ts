import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'
import { getResizedTableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

export const handleTableResizerPointerMove = (state: ChatDebugViewState, clientX: number): ChatDebugViewState => {
  if (!state.tableResizerDownId) {
    return state
  }
  return {
    ...state,
    tableColumnWidths: getResizedTableColumnWidths(
      state.width,
      state.tableWidth,
      TableColumn.getVisibleTableColumns(state.tableColumns),
      state.tableColumnWidths,
      state.x,
      clientX,
      state.tableResizerDownId,
    ),
  }
}
