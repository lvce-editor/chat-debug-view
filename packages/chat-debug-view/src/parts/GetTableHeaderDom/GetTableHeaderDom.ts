import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { TableHead, TableRow } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getHeaderCellNodes } from '../GetHeaderCellNodes/GetHeaderCellNodes.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

const tableHeaderNode: VirtualDomNode = {
  childCount: 1,
  className: TableHead,
  onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
  type: VirtualDomElements.THead,
}

export const getTableHeaderDom = (
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
): readonly VirtualDomNode[] => {
  return [
    tableHeaderNode,
    {
      childCount: visibleTableColumns.length,
      className: TableRow,
      type: VirtualDomElements.Tr,
    },
    ...getHeaderCellNodes(visibleTableColumns, tableColumns),
  ]
}
