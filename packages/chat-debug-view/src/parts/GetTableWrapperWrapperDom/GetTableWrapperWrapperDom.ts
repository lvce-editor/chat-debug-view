import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { TableColumn } from '../TableColumn/TableColumn.ts'
import { TableWrapperWrapper } from '../ClassNames/ClassNames.ts'
import { getTableSummaryDom } from '../GetTableSummaryDom/GetTableSummaryDom.ts'
import { getTableWrapperDom } from '../GetTableWrapperDom/GetTableWrapperDom.ts'

export const getTableWrapperWrapperDom = (
  rowNodes: readonly VirtualDomNode[],
  eventCount: number,
  visibleTableColumns: readonly string[],
  tableColumns: readonly TableColumn[],
  summaries: readonly string[],
  focus: number,
  className: string,
  role: string,
  showScrollBar: boolean,
): readonly VirtualDomNode[] => {
  const tableSummaryNodes = getTableSummaryDom(summaries)
  return [
    {
      childCount: tableSummaryNodes.length === 0 ? 1 : 2,
      className: TableWrapperWrapper,
      type: VirtualDomElements.Div,
    },
    ...getTableWrapperDom(rowNodes, eventCount, visibleTableColumns, tableColumns, summaries, focus, className, role, showScrollBar),
    ...tableSummaryNodes,
  ]
}
