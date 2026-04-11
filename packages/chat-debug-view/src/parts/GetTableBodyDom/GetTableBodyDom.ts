import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { TableBody } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getTableBodyDom = (rowNodes: readonly VirtualDomNode[], eventCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: eventCount === 0 ? 1 : eventCount,
      className: TableBody,
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      onPointerDown: DomEventListenerFunctions.HandleEventRowClickAt,
      type: VirtualDomElements.TBody,
    },
    ...rowNodes,
  ]
}
