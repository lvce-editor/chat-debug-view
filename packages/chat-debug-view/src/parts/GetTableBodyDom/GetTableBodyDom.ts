import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTableBody } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getTableBodyDom = (rowNodes: readonly VirtualDomNode[], eventCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: eventCount === 0 ? 1 : eventCount,
      className: ChatDebugViewTableBody,
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      onPointerDown: DomEventListenerFunctions.HandleEventRowClick,
      type: VirtualDomElements.TBody,
    },
    ...rowNodes,
  ]
}
