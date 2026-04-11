import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { TableHeader, TableRow } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getHeaderCellNodes } from '../GetHeaderCellNodes/GetHeaderCellNodes.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getTableHeaderDom = (
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
): readonly VirtualDomNode[] => {
  const headerCellNodes = getHeaderCellNodes(visibleTableColumns, tableColumns)
  return [
    {
      childCount: 1,
      className: TableHeader,
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.THead,
    },
    {
      childCount: visibleTableColumns.length,
      className: TableRow,
      type: VirtualDomElements.Tr,
    },
    ...headerCellNodes,
  ]
}
