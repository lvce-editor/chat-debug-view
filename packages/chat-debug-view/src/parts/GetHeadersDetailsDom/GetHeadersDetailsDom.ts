import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewTiming, ChatDebugViewTimingLabel } from '../ClassNames/ClassNames.ts'
import { getHeadersDetails } from '../GetHeadersDetails/GetHeadersDetails.ts'
import { getTimingRowDom } from '../GetTimingRowDom/GetTimingRowDom.ts'

const getSectionHeadingDom = (title: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ChatDebugViewTimingLabel,
      type: VirtualDomElements.Div,
    },
    text(title),
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
      childCount: 2 + general.length + responseHeaders.length,
      className: ChatDebugViewTiming,
      type: VirtualDomElements.Div,
    },
    ...getSectionHeadingDom(ChatDebugStrings.general()),
    ...general.flatMap((entry) => getTimingRowDom(entry.label, entry.value)),
    ...getSectionHeadingDom(ChatDebugStrings.responseHeaders()),
    ...responseHeaders.flatMap((entry) => getTimingRowDom(entry.label, entry.value)),
  ]
}
