import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTable, ChatDebugViewTableWrapper } from '../ClassNames/ClassNames.ts'
import { getTableBodyDom } from '../GetTableBodyDom/GetTableBodyDom.ts'
import { getTableHeaderDom } from '../GetTableHeaderDom/GetTableHeaderDom.ts'
import { getTableResizersDom } from '../GetTableResizersDom/GetTableResizersDom.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'

export const getTableDom = (
  rowNodes: readonly VirtualDomNode[],
  eventCount: number,
  visibleTableColumns: readonly string[] = defaultVisibleTableColumns,
): readonly VirtualDomNode[] => {
  const resizerNodes = getTableResizersDom(visibleTableColumns)
  return [
    {
      childCount: 1 + (resizerNodes.length > 0 ? 1 : 0),
      className: ChatDebugViewTableWrapper,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ChatDebugViewTable,
      type: VirtualDomElements.Table,
    },
    ...getTableHeaderDom(visibleTableColumns),
    ...getTableBodyDom(rowNodes, eventCount),
    ...resizerNodes,
  ]
}
