import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { ChatDebugViewDevtoolsSplit } from '../ClassNames/ClassNames.ts'

const getNextSiblingIndex = (nodes: readonly VirtualDomNode[], index: number): number => {
  let nextSiblingIndex = index + 1
  const childCount = nodes[index]?.childCount || 0
  for (let i = 0; i < childCount; i++) {
    nextSiblingIndex = getNextSiblingIndex(nodes, nextSiblingIndex)
  }
  return nextSiblingIndex
}

const getDirectChildCount = (nodes: readonly VirtualDomNode[]): number => {
  let count = 0
  let index = 0
  while (index < nodes.length) {
    count++
    index = getNextSiblingIndex(nodes, index)
  }
  return count
}

export const getSplitViewDom = (
  splitChildCount: number,
  eventsClassName: string,
  tableNodes: readonly VirtualDomNode[],
  sashNodes: readonly VirtualDomNode[],
  detailsNodes: readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  const eventsChildCount = getDirectChildCount(tableNodes)
  if (splitChildCount === 1) {
    return [
      {
        childCount: eventsChildCount,
        className: eventsClassName,
        role: 'application',
        type: VirtualDomElements.Div,
      },
      ...tableNodes,
    ]
  }

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
