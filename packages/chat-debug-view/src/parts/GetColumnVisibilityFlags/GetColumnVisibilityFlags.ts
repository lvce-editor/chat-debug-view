import { MenuItemFlags } from '@lvce-editor/constants'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getColumnVisibilityFlags = (tableColumns: readonly TableColumn.TableColumn[], column: TableColumn.TableColumnName): number => {
  return TableColumn.isVisibleTableColumn(tableColumns, column) ? MenuItemFlags.Checked : MenuItemFlags.Unchecked
}
