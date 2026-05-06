import { type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as GetHeaderCellNode from '../GetHeaderCellNode/GetHeaderCellNode.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getHeaderCellNodes = (
  visibleTableColumns: readonly string[],
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
): readonly VirtualDomNode[] => {
  const orderedVisibleTableColumns = TableColumn.getOrderedVisibleTableColumns(visibleTableColumns, tableColumns)
  return orderedVisibleTableColumns.flatMap((column) => GetHeaderCellNode.getHeaderCellNode(column, tableColumns))
}
