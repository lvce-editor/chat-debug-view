import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewTiming } from '../ClassNames/ClassNames.ts'
import { getTimingRowDom } from '../GetTimingRowDom/GetTimingRowDom.ts'
import { getTokenUsageDetails } from '../GetTokenUsageDetails/GetTokenUsageDetails.ts'

export const getTokenUsageDetailsDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  const usageDetails = getTokenUsageDetails(event)
  if (!usageDetails) {
    return []
  }
  const rows: VirtualDomNode[] = []
  let rowCount = 0
  if (usageDetails.inputTokens !== undefined) {
    rows.push(...getTimingRowDom(ChatDebugStrings.inputTokens(), String(usageDetails.inputTokens)))
    rowCount++
  }
  if (usageDetails.outputTokens !== undefined) {
    rows.push(...getTimingRowDom(ChatDebugStrings.outputTokens(), String(usageDetails.outputTokens)))
    rowCount++
  }
  if (usageDetails.cachedTokens !== undefined) {
    rows.push(...getTimingRowDom(ChatDebugStrings.cachedTokens(), String(usageDetails.cachedTokens)))
    rowCount++
  }
  return [
    {
      childCount: rowCount,
      className: ChatDebugViewTiming,
      type: VirtualDomElements.Div,
    },
    ...rows,
  ]
}
