import { MenuItemFlags } from '@lvce-editor/constants'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getColumnVisibilityFlags = (state: ChatDebugViewState, column: TableColumn.TableColumn): number => {
  return TableColumn.isVisibleTableColumn(state.visibleTableColumns, column) ? MenuItemFlags.Checked : MenuItemFlags.Unchecked
}
