import type * as TableColumn from '../TableColumn/TableColumn.ts'

export interface TableColumnLayout {
  readonly fixedColumns: readonly TableColumn.TableColumn[]
  readonly resizerLefts: readonly number[]
  readonly visibleColumns: readonly TableColumn.TableColumn[]
  readonly visibleColumnWidths: readonly number[]
}
