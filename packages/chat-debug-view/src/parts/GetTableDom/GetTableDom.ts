import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTable } from '../ClassNames/ClassNames.ts'
import { getTableBodyDom } from '../GetTableBodyDom/GetTableBodyDom.ts'
import { getTableHeaderDom } from '../GetTableHeaderDom/GetTableHeaderDom.ts'

export const getTableDom = (rowNodes: readonly VirtualDomNode[], eventCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ChatDebugViewTable,
      type: VirtualDomElements.Table,
    },
    ...getTableHeaderDom(),
    ...getTableBodyDom(rowNodes, eventCount),
  ]
}
