import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { ChatDebugViewDevtoolsSplit } from '../ClassNames/ClassNames.ts'

export const getSplitViewDom = (
  splitChildCount: number,
  eventsChildCount: number,
  eventsClassName: string,
  tableNodes: readonly VirtualDomNode[],
  sashNodes: readonly VirtualDomNode[],
  detailsNodes: readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  return [
    {
      childCount: splitChildCount,
      className: ChatDebugViewDevtoolsSplit,
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
    {
      childCount: eventsChildCount,
      className: eventsClassName,
      role: 'application',
      type: VirtualDomElements.Div,
    },
    ...tableNodes,
    ...sashNodes,
    ...detailsNodes,
  ]
}
