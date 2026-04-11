import { MenuItemFlags } from '@lvce-editor/constants'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getColumnVisibilityFlags = (visibleTableColumns: readonly string[], column: TableColumn.TableColumnName): number => {
  return TableColumn.isVisibleTableColumn(visibleTableColumns, column) ? MenuItemFlags.Checked : MenuItemFlags.Unchecked
}
