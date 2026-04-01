import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getTableHeaderDom = (): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 3,
      className: 'ChatDebugViewTableHeader',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellType',
      type: VirtualDomElements.Div,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Div,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellStatus',
      type: VirtualDomElements.Div,
    },
    text('Status'),
  ]
}

export const getTableBodyDom = (rowNodes: readonly VirtualDomNode[], eventCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: eventCount === 0 ? 1 : eventCount,
      className: 'ChatDebugViewTableBody',
      onPointerDown: DomEventListenerFunctions.HandleEventRowClick,
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      type: VirtualDomElements.Div,
    },
    ...rowNodes,
  ]
}

export const getTableDom = (rowNodes: readonly VirtualDomNode[], eventCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: 'ChatDebugViewTable',
      type: VirtualDomElements.Div,
    },
    ...getTableHeaderDom(),
    ...getTableBodyDom(rowNodes, eventCount),
  ]
}
