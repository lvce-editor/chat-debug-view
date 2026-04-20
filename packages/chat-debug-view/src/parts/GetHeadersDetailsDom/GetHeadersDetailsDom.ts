import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import {
  ChatDebugViewHeaders,
  ChatDebugViewHeadersSection,
  ChatDebugViewHeadersSectionTitle,
  ChatDebugViewTiming,
  ChatDebugViewTimingLabel,
} from '../ClassNames/ClassNames.ts'
import { getHeadersDetails } from '../GetHeadersDetails/GetHeadersDetails.ts'
import { getTimingRowDom } from '../GetTimingRowDom/GetTimingRowDom.ts'

const getSectionDom = (title: string, entries: readonly { readonly label: string; readonly value: string }[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1 + entries.length,
      className: ChatDebugViewHeadersSection,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: mergeClassNames(ChatDebugViewTimingLabel, ChatDebugViewHeadersSectionTitle),
      type: VirtualDomElements.Div,
    },
    text(title),
    ...entries.flatMap((entry) => getTimingRowDom(entry.label, entry.value)),
  ]
}

export const getHeadersDetailsDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  const headersDetails = getHeadersDetails(event)
  if (!headersDetails) {
    return []
  }
  const { general, responseHeaders } = headersDetails
  return [
    {
      childCount: 2,
      className: mergeClassNames(ChatDebugViewTiming, ChatDebugViewHeaders),
      type: VirtualDomElements.Div,
    },
    ...getSectionDom(ChatDebugStrings.general(), general),
    ...getSectionDom(ChatDebugStrings.responseHeaders(), responseHeaders),
  ]
}
