import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { TableSummary } from '../ClassNames/ClassNames.ts'

const tableSummaryNode = {
  childCount: 0,
  className: TableSummary,
  role: AriaRoles.Status,
  type: VirtualDomElements.Div,
}

const tableSummaryNodes = new Map<number, VirtualDomNode>()

export const getTableSummaryNode = (childCount: number): VirtualDomNode => {
  const existing = tableSummaryNodes.get(childCount)
  if (existing) {
    return existing
  }
  const node = {
    ...tableSummaryNode,
    childCount,
  }
  tableSummaryNodes.set(childCount, node)
  return node
}
