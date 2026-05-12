import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewTiming } from '../ClassNames/ClassNames.ts'
import { getTimingRowDom } from '../GetTimingRowDom/GetTimingRowDom.ts'
import { getTokenUsageDetails } from '../GetTokenUsageDetails/GetTokenUsageDetails.ts'

type TokenUsageRowViewModel = {
  readonly key: string
  readonly value: number | undefined
}

type DefinedTokenUsageRowViewModel = {
  readonly key: string
  readonly value: number
}

const getRowViewModels = (event: ChatViewEvent): readonly DefinedTokenUsageRowViewModel[] => {
  const usageDetails = getTokenUsageDetails(event)
  if (!usageDetails) {
    return []
  }
  return [
    {
      key: ChatDebugStrings.inputTokens(),
      value: usageDetails.inputTokens,
    },
    {
      key: ChatDebugStrings.outputTokens(),
      value: usageDetails.outputTokens,
    },
    {
      key: ChatDebugStrings.cachedTokens(),
      value: usageDetails.cachedTokens,
    },
  ].filter((row: Readonly<TokenUsageRowViewModel>): row is DefinedTokenUsageRowViewModel => row.value !== undefined)
}

export const getTokenUsageDetailsDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  const rowViewModels = getRowViewModels(event)
  if (rowViewModels.length === 0) {
    return []
  }
  const rows = rowViewModels.flatMap((row: Readonly<DefinedTokenUsageRowViewModel>) => getTimingRowDom(row.key, String(row.value)))
  return [
    {
      childCount: rowViewModels.length,
      className: ChatDebugViewTiming,
      type: VirtualDomElements.Div,
    },
    ...rows,
  ]
}
