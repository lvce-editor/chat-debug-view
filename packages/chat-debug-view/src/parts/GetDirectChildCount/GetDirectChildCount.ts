import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { getNextSiblingIndex } from '../GetNextSiblingIndex/GetNextSiblingIndex.ts'

export const getDirectChildCount = (nodes: readonly VirtualDomNode[]): number => {
  let count = 0
  let index = 0
  while (index < nodes.length) {
    count++
    index = getNextSiblingIndex(nodes, index)
  }
  return count
}
