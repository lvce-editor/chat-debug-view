import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTable } from '../ClassNames/ClassNames.ts'
import { getTableBodyDom } from '../GetTableBodyDom/GetTableBodyDom.ts'
import { getTableHeaderDom } from '../GetTableHeaderDom/GetTableHeaderDom.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'

export const getTableDom = (
  rowNodes: readonly VirtualDomNode[],
  eventCount: number,
  visibleTableColumns: readonly string[] = defaultVisibleTableColumns,
): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ChatDebugViewTable,
      type: VirtualDomElements.Table,
    },
    ...getTableHeaderDom(visibleTableColumns),
    ...getTableBodyDom(rowNodes, eventCount),
  ]
}
