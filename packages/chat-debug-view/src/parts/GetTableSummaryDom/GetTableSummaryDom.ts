import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getTableSummaryNode } from '../GetTableSummaryNode/GetTableSummaryNode.ts'

const tableSummaryItemNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Span,
}

const tableSummarySeparatorNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Span,
}

const getTableSummaryItemDom = (summary: string, hasSeparator: boolean): VirtualDomNode[] => {
  if (hasSeparator) {
    return [tableSummaryItemNode, text(summary), tableSummarySeparatorNode, text(' | ')]
  }
  return [tableSummaryItemNode, text(summary)]
}

export const getTableSummaryDom = (summaries: readonly string[]): readonly VirtualDomNode[] => {
  const nonEmptySummaries = summaries.filter(Boolean)
  if (nonEmptySummaries.length === 0) {
    return []
  }
  const nodes: VirtualDomNode[] = [getTableSummaryNode(nonEmptySummaries.length * 2 - 1)]
  for (let i = 0; i < nonEmptySummaries.length; i++) {
    const hasSeparator = i < nonEmptySummaries.length - 1
    nodes.push(...getTableSummaryItemDom(nonEmptySummaries[i], hasSeparator))
  }
  return nodes
}
