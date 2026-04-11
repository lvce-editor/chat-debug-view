import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { Table, ChatDebugViewTableWrapper } from '../ClassNames/ClassNames.ts'
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
  const resizerNodes = getTableResizersDom(visibleTableColumns)
  const columnGroupNodes = getTableColumnGroupDom(visibleTableColumns)
  const summaryNodes = summary ? getTableSummaryDom(summary) : []
  return [
    {
      childCount: 1 + (summaryNodes.length > 0 ? 1 : 0) + (resizerNodes.length > 0 ? 1 : 0),
      className: ChatDebugViewTableWrapper,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: Table,
      type: VirtualDomElements.Table,
    },
    ...columnGroupNodes,
    ...getTableHeaderDom(visibleTableColumns, tableColumns),
    ...getTableBodyDom(rowNodes, eventCount),
    ...summaryNodes,
    ...resizerNodes,
  ]
}
