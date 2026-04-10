import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
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
      state.visibleTableColumns,
      state.tableColumnWidths,
      state.x,
      clientX,
      state.tableResizerDownId,
    ),
  }
}
