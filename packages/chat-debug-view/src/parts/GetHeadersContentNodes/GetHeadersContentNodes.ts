import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { HeaderSectionKey } from '../HeaderSectionKey/HeaderSectionKey.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { getGeneralEntries } from '../GetGeneralEntries/GetGeneralEntries.ts'
import { getHeaders } from '../GetHeaders/GetHeaders.ts'
import { getHeaderSectionNodes } from '../GetHeaderSectionNodes/GetHeaderSectionNodes.ts'
import * as HeaderSectionKeyModule from '../HeaderSectionKey/HeaderSectionKey.ts'
import { isHeadersRecord } from '../IsHeadersRecord/IsHeadersRecord.ts'

export const getHeadersContentNodes = (
  responseEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
  collapsedHeaderSections: readonly HeaderSectionKey[] = [],
): readonly VirtualDomNode[] => {
  const generalEntries = getGeneralEntries(selectedEvent)
  const requestHeaders = getHeaders(selectedEvent?.headers)
  const responseHeaders = getHeaders(isHeadersRecord(selectedEvent?.endValue) ? selectedEvent.endValue.headers : undefined)
  if (generalEntries.length === 0 && requestHeaders.length === 0 && responseHeaders.length === 0) {
    return responseEventNodes
  }
  const nodes: VirtualDomNode[] = []
  if (generalEntries.length > 0) {
    nodes.push(...getHeaderSectionNodes(HeaderSectionKeyModule.General, ChatDebugStrings.general(), generalEntries, collapsedHeaderSections))
  }
  if (responseHeaders.length > 0) {
    nodes.push(
      ...getHeaderSectionNodes(
        HeaderSectionKeyModule.ResponseHeaders,
        ChatDebugStrings.responseHeaders(),
        responseHeaders,
        collapsedHeaderSections,
        ChatDebugStrings.responseHeadersInfo(),
      ),
    )
  }
  if (requestHeaders.length > 0) {
    nodes.push(
      ...getHeaderSectionNodes(HeaderSectionKeyModule.RequestHeaders, ChatDebugStrings.requestHeaders(), requestHeaders, collapsedHeaderSections),
    )
  }
  return nodes
}
