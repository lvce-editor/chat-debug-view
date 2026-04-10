import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTableHeader, ChatDebugViewTableHeaderRow } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getHeaderCellNodes } from '../GetHeaderCellNodes/GetHeaderCellNodes.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'

export const getTableHeaderDom = (visibleTableColumns: readonly string[] = defaultVisibleTableColumns): readonly VirtualDomNode[] => {
  const headerCellNodes = getHeaderCellNodes(visibleTableColumns)
  return [
    {
      childCount: 1,
      className: ChatDebugViewTableHeader,
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.THead,
    },
    {
      childCount: visibleTableColumns.length,
      className: ChatDebugViewTableHeaderRow,
      type: VirtualDomElements.Tr,
    },
    ...headerCellNodes,
  ]
}
