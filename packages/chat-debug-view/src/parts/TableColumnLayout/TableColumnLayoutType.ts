import type * as TableColumn from '../TableColumn/TableColumn.ts'

export interface TableColumnLayout {
  readonly fixedColumns: readonly TableColumn.TableColumnName[]
  readonly resizerLefts: readonly number[]
  readonly visibleColumns: readonly TableColumn.TableColumnName[]
  readonly visibleColumnWidths: readonly number[]
}
