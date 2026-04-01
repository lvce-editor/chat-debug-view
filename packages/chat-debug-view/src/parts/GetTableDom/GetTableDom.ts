import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getTableHeaderDom = (): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: 'ChatDebugViewTableHeader',
      type: VirtualDomElements.THead,
    },
    {
      childCount: 3,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellType',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellStatus',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Status'),
  ]
}

export const getTableBodyDom = (rowNodes: readonly VirtualDomNode[], eventCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: eventCount === 0 ? 1 : eventCount,
      className: 'ChatDebugViewTableBody',
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      onPointerDown: DomEventListenerFunctions.HandleEventRowClick,
      type: VirtualDomElements.TBody,
    },
    ...rowNodes,
  ]
}

export const getTableDom = (rowNodes: readonly VirtualDomNode[], eventCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: 'ChatDebugViewTable',
      type: VirtualDomElements.Table,
    },
    ...getTableHeaderDom(),
    ...getTableBodyDom(rowNodes, eventCount),
  ]
}
