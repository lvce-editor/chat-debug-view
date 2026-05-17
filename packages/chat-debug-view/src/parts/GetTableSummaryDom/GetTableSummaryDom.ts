import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getTableSummaryNode } from '../GetTableSummaryNode/GetTableSummaryNode.ts'

const tableSummaryItemNode = {
  childCount: 1,
  type: VirtualDomElements.Span,
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
