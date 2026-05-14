import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { HeaderSectionKey } from '../HeaderSectionKey/HeaderSectionKey.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { getGeneralEntries } from '../GetGeneralEntries/GetGeneralEntries.ts'
import { getHeaders } from '../GetHeaders/GetHeaders.ts'
import { getHeaderValueText } from '../GetHeaderValueText/GetHeaderValueText.ts'
import * as HeaderSectionKeyModule from '../HeaderSectionKey/HeaderSectionKey.ts'
import { isHeadersRecord } from '../IsHeadersRecord/IsHeadersRecord.ts'

export interface HeaderSectionItem {
  readonly key: string
  readonly value: string
}

export interface VisibleHeaderSection {
  readonly heading: string
  readonly info: string
  readonly isExpanded: boolean
  readonly items: readonly HeaderSectionItem[]
  readonly key: HeaderSectionKey
}

const toHeaderSectionItems = (entries: readonly (readonly [string, unknown])[]): readonly HeaderSectionItem[] => {
  return entries.map(([key, value]) => ({
    key,
    value: getHeaderValueText(value),
  }))
}

export const getVisibleHeaderSections = (
  selectedEvent: ChatViewEvent | null,
  collapsedHeaderSections: readonly HeaderSectionKey[] = [],
): readonly VisibleHeaderSection[] => {
  const sections = [
    {
      heading: ChatDebugStrings.general(),
      info: '',
      items: toHeaderSectionItems(getGeneralEntries(selectedEvent)),
      key: HeaderSectionKeyModule.General,
    },
    {
      heading: ChatDebugStrings.responseHeaders(),
      info: ChatDebugStrings.responseHeadersInfo(),
      items: toHeaderSectionItems(getHeaders(isHeadersRecord(selectedEvent?.endValue) ? selectedEvent.endValue.headers : undefined)),
      key: HeaderSectionKeyModule.ResponseHeaders,
    },
    {
      heading: ChatDebugStrings.requestHeaders(),
      info: '',
      items: toHeaderSectionItems(getHeaders(selectedEvent?.headers)),
      key: HeaderSectionKeyModule.RequestHeaders,
    },
  ] as const
  return sections
    .filter((section) => section.items.length > 0)
    .map((section) => ({
      ...section,
      isExpanded: !collapsedHeaderSections.includes(section.key),
    }))
}
