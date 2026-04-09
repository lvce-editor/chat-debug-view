import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewHeaderCell, ChatDebugViewTableHeader, ChatDebugViewTableHeaderRow } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

const getHeaderCellNodes = (visibleTableColumns: readonly string[]): readonly VirtualDomNode[] => {
  return visibleTableColumns.flatMap((column) => {
    switch (column) {
      case TableColumn.Duration:
        return [
          {
            childCount: 1,
            className: ChatDebugViewHeaderCell,
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(ChatDebugStrings.duration()),
        ]
      case TableColumn.Status:
        return [
          {
            childCount: 1,
            className: ChatDebugViewHeaderCell,
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(ChatDebugStrings.status()),
        ]
      case TableColumn.Type:
        return [
          {
            childCount: 1,
            className: ChatDebugViewHeaderCell,
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(ChatDebugStrings.type()),
        ]
      default:
        return []
    }
  })
}

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
