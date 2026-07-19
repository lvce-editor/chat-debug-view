import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { Table } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getTableBodyDom } from '../GetTableBodyDom/GetTableBodyDom.ts'
import { getTableColumnGroupDom } from '../GetTableColumnGroupDom/GetTableColumnGroupDom.ts'
import { getTableHeaderDom } from '../GetTableHeaderDom/GetTableHeaderDom.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getTableDom = (
  rowNodes: readonly VirtualDomNode[],
  eventCount: number,
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
  summaries: readonly string[] = [],
  focus = 0,
): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 3,
      className: Table,
      onFocus: DomEventListenerFunctions.HandleTableFocus,
      tabIndex: TabIndex.Focusable,
      type: VirtualDomElements.Table,
    },
    ...getTableColumnGroupDom(visibleTableColumns),
    ...getTableHeaderDom(visibleTableColumns, tableColumns),
    ...getTableBodyDom(rowNodes, eventCount),
  ]
}
