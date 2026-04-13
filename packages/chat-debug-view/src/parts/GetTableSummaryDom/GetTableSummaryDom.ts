import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { TableSummary, TableSummaryItem } from '../ClassNames/ClassNames.ts'

const separator = ', '

const getTableSummaryParts = (summary: string): readonly string[] => {
  const separatorIndex = summary.indexOf(separator)
  if (separatorIndex === -1) {
    return [summary]
  }
  return [summary.slice(0, separatorIndex), summary.slice(separatorIndex + separator.length)]
}

const getTableSummaryItemDom = (value: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: TableSummaryItem,
      type: VirtualDomElements.Span,
    },
    text(value),
  ]
}

export const getTableSummaryDom = (summary: string): readonly VirtualDomNode[] => {
  if (!summary) {
    return []
  }
  const summaryParts = getTableSummaryParts(summary)
  return [
    {
      'aria-label': summary,
      childCount: summaryParts.length,
      className: TableSummary,
      role: AriaRoles.Status,
      type: VirtualDomElements.Div,
    },
    ...summaryParts.flatMap(getTableSummaryItemDom),
  ]
}
