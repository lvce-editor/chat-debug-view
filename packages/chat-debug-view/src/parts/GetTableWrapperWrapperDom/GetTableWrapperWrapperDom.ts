import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { TableWrapperWrapper } from '../ClassNames/ClassNames.ts'
import { getTableSummaryDom } from '../GetTableSummaryDom/GetTableSummaryDom.ts'
import { getTableWrapperDom } from '../GetTableWrapperDom/GetTableWrapperDom.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getTableWrapperWrapperDom = (
  rowNodes: readonly VirtualDomNode[],
  eventCount: number,
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
  summary = '',
  focus = 0,
  className = '',
  role = '',
): readonly VirtualDomNode[] => {
  const tableSummaryNodes = getTableSummaryDom(summary)
  return [
    {
      childCount: tableSummaryNodes.length === 0 ? 1 : 2,
      className: TableWrapperWrapper,
      type: VirtualDomElements.Div,
    },
    ...getTableWrapperDom(rowNodes, eventCount, visibleTableColumns, tableColumns, summary, focus, className, role),
    ...tableSummaryNodes,
  ]
}
