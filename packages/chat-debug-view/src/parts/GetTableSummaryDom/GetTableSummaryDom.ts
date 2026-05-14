import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { TableSummary } from '../ClassNames/ClassNames.ts'

const tableSummaryNode = {
  childCount: 0,
  className: TableSummary,
  role: AriaRoles.Status,
  type: VirtualDomElements.Div,
}

const tableSummaryItemNode = {
  childCount: 1,
  type: VirtualDomElements.Span,
}

const tableSummaryNodes = new Map<number, VirtualDomNode>()

const getTableSummaryNode = (childCount: number): VirtualDomNode => {
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

export const getTableSummaryDom = (summaries: readonly string[]): readonly VirtualDomNode[] => {
  const nonEmptySummaries = summaries.filter(Boolean)
  if (nonEmptySummaries.length === 0) {
    return []
  }
  const nodes: VirtualDomNode[] = [getTableSummaryNode(nonEmptySummaries.length * 2 - 1)]
  for (let i = 0; i < nonEmptySummaries.length; i++) {
    nodes.push(tableSummaryItemNode, text(nonEmptySummaries[i]))
    if (i < nonEmptySummaries.length - 1) {
      nodes.push(text(' | '))
    }
  }
  return nodes
}
