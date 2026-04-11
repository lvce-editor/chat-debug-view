import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { ChatDebugViewTableSummary } from '../ClassNames/ClassNames.ts'

const tableSummaryNode = {
  childCount: 1,
  className: ChatDebugViewTableSummary,
  role: AriaRoles.Status,
  type: VirtualDomElements.Div,
}

export const getTableSummaryDom = (summary: string): readonly VirtualDomNode[] => {
  if (!summary) {
    return []
  }
  return [tableSummaryNode, text(summary)]
}
