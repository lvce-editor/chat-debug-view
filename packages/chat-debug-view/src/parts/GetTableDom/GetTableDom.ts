import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTable, ChatDebugViewTableWrapper } from '../ClassNames/ClassNames.ts'
import { getTableBodyDom } from '../GetTableBodyDom/GetTableBodyDom.ts'
import { getTableColumnGroupDom } from '../GetTableColumnGroupDom/GetTableColumnGroupDom.ts'
import { getTableHeaderDom } from '../GetTableHeaderDom/GetTableHeaderDom.ts'
import { getTableResizersDom } from '../GetTableResizersDom/GetTableResizersDom.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getTableDom = (
  rowNodes: readonly VirtualDomNode[],
  eventCount: number,
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
): readonly VirtualDomNode[] => {
  const resizerNodes = getTableResizersDom(visibleTableColumns)
  const columnGroupNodes = getTableColumnGroupDom(visibleTableColumns)
  return [
    {
      childCount: 1 + (resizerNodes.length > 0 ? 1 : 0),
      className: ChatDebugViewTableWrapper,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: ChatDebugViewTable,
      type: VirtualDomElements.Table,
    },
    ...columnGroupNodes,
    ...getTableHeaderDom(visibleTableColumns, tableColumns),
    ...getTableBodyDom(rowNodes, eventCount),
    ...resizerNodes,
  ]
}
