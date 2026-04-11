import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { Table, TableWrapper } from '../ClassNames/ClassNames.ts'
import { getTableBodyDom } from '../GetTableBodyDom/GetTableBodyDom.ts'
import { getTableColumnGroupDom } from '../GetTableColumnGroupDom/GetTableColumnGroupDom.ts'
import { getTableHeaderDom } from '../GetTableHeaderDom/GetTableHeaderDom.ts'
import { getTableResizersDom } from '../GetTableResizersDom/GetTableResizersDom.ts'
import { getTableSummaryDom } from '../GetTableSummaryDom/GetTableSummaryDom.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getTableDom = (
  rowNodes: readonly VirtualDomNode[],
  eventCount: number,
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
  summary = '',
): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: TableWrapper,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: Table,
      type: VirtualDomElements.Table,
    },
    ...getTableColumnGroupDom(visibleTableColumns),
    ...getTableHeaderDom(visibleTableColumns, tableColumns),
    ...getTableBodyDom(rowNodes, eventCount),
    ...getTableResizersDom(visibleTableColumns),
    ...getTableSummaryDom(summary),
  ]
}
