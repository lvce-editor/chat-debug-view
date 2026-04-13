import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { ChatDebugViewDevtoolsSplit } from '../ClassNames/ClassNames.ts'

export const getSplitViewDom = (
  splitChildCount: number,
  tableNodes: readonly VirtualDomNode[],
  sashNodes: readonly VirtualDomNode[],
  detailsNodes: readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  if (splitChildCount === 1) {
    return tableNodes
  }

  return [
    {
      childCount: splitChildCount,
      className: ChatDebugViewDevtoolsSplit,
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
    ...tableNodes,
    ...sashNodes,
    ...detailsNodes,
  ]
}
