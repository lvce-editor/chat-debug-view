import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'

export const getNextSiblingIndex = (nodes: readonly VirtualDomNode[], index: number): number => {
  let nextSiblingIndex = index + 1
  const childCount = nodes[index]?.childCount || 0
  for (let i = 0; i < childCount; i++) {
    nextSiblingIndex = getNextSiblingIndex(nodes, nextSiblingIndex)
  }
  return nextSiblingIndex
}
