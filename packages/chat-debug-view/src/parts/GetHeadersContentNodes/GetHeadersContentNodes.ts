import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { HeaderSectionKey } from '../HeaderSectionKey/HeaderSectionKey.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import {
  ChatDebugViewHeadersCell,
  ChatDebugViewHeadersCellName,
  ChatDebugViewHeadersCellValue,
  ChatDebugViewHeadersRow,
  ChatDebugViewHeadersRowEven,
  ChatDebugViewHeadersRowOdd,
  ChatDebugViewHeadersSection,
  ChatDebugViewHeadersSectionHeading,
  ChatDebugViewHeadersTable,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { formatHttpStatusCode } from '../FormatHttpStatusCode/FormatHttpStatusCode.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'
import * as HeaderSectionKeyModule from '../HeaderSectionKey/HeaderSectionKey.ts'
import * as InputName from '../InputName/InputName.ts'

const isHeadersRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

type HeaderEntry = readonly [string, unknown]

const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.length > 0
}

const getStatusCodeValue = (selectedEvent: ChatViewEvent | null): unknown => {
  if (!selectedEvent) {
    return undefined
  }
  const endValue = isHeadersRecord(selectedEvent.endValue) ? selectedEvent.endValue : undefined
  if (endValue?.statusCode !== undefined) {
    return endValue.statusCode
  }
  if (selectedEvent.statusCode !== undefined) {
    return selectedEvent.statusCode
  }
  if (selectedEvent.type === 'ai-request' || selectedEvent.type === 'ai-response') {
    return getStatusText(selectedEvent)
  }
  return undefined
}

const stringifyHeaderValue = (value: Readonly<object>): string => {
  try {
    return JSON.stringify(value, (_key, nestedValue: unknown) => {
      if (typeof nestedValue === 'bigint') {
        return nestedValue.toString()
      }
      return nestedValue
    })
  } catch {
    return '[unserializable]'
  }
}

const getHeaderValueText = (value: unknown): string => {
  if (typeof value === 'string') {
    return value
  }
  if (value === undefined) {
    return ''
  }
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value)
  }
  if (value === null) {
    return 'null'
  }
  if (typeof value === 'symbol') {
    return value.description ? `Symbol(${value.description})` : 'Symbol()'
  }
  if (typeof value === 'function') {
    return '[function]'
  }
  return stringifyHeaderValue(value)
}

const getHeaders = (value: unknown): readonly HeaderEntry[] => {
  if (!isHeadersRecord(value)) {
    return []
  }
  return Object.entries(value)
}

const getGeneralEntries = (selectedEvent: ChatViewEvent | null): readonly HeaderEntry[] => {
  if (!selectedEvent) {
    return []
  }
  const entries: HeaderEntry[] = []
  if (isNonEmptyString(selectedEvent.url)) {
    entries.push([ChatDebugStrings.requestUrl(), selectedEvent.url])
  }
  if (isNonEmptyString(selectedEvent.method)) {
    entries.push([ChatDebugStrings.requestMethod(), selectedEvent.method])
  }
  const statusCode = getStatusCodeValue(selectedEvent)
  if (statusCode !== undefined && statusCode !== '') {
    entries.push([ChatDebugStrings.statusCode(), formatHttpStatusCode(statusCode)])
  }
  return entries
}

const getHeaderRowNodes = (headerName: string, headerValue: unknown, index: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: mergeClassNames(ChatDebugViewHeadersRow, index % 2 === 0 ? ChatDebugViewHeadersRowOdd : ChatDebugViewHeadersRowEven),
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      className: mergeClassNames(ChatDebugViewHeadersCell, ChatDebugViewHeadersCellName),
      type: VirtualDomElements.Div,
    },
    text(headerName),
    {
      childCount: 1,
      className: mergeClassNames(ChatDebugViewHeadersCell, ChatDebugViewHeadersCellValue),
      type: VirtualDomElements.Div,
    },
    text(getHeaderValueText(headerValue)),
  ]
}

const getHeadersTableNodes = (headers: readonly HeaderEntry[]): readonly VirtualDomNode[] => {
  const headerRows: VirtualDomNode[] = []
  for (const [index, [headerName, headerValue]] of headers.entries()) {
    headerRows.push(...getHeaderRowNodes(headerName, headerValue, index))
  }
  return [
    {
      childCount: headers.length,
      className: ChatDebugViewHeadersTable,
      type: VirtualDomElements.Ul,
    },
    ...headerRows,
  ]
}

const getHeaderSectionNodes = (
  section: HeaderSectionKey,
  label: string,
  headers: readonly HeaderEntry[],
  collapsedHeaderSections: readonly HeaderSectionKey[],
): readonly VirtualDomNode[] => {
  const isCollapsed = collapsedHeaderSections.includes(section)
  return [
    {
      childCount: isCollapsed ? 1 : 2,
      className: ChatDebugViewHeadersSection,
      type: VirtualDomElements.Div,
    },
    {
      ariaExpanded: !isCollapsed,
      childCount: 1,
      className: ChatDebugViewHeadersSectionHeading,
      name: InputName.ToggleHeadersSection,
      onChange: DomEventListenerFunctions.HandleFilterInput,
      onClick: DomEventListenerFunctions.HandleFilterInput,
      type: VirtualDomElements.Button,
      value: section,
    },
    text(label),
    ...(isCollapsed ? [] : getHeadersTableNodes(headers)),
  ]
}

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
  if (requestHeaders.length > 0) {
    nodes.push(
      ...getHeaderSectionNodes(HeaderSectionKeyModule.RequestHeaders, ChatDebugStrings.requestHeaders(), requestHeaders, collapsedHeaderSections),
    )
  }
  if (responseHeaders.length > 0) {
    nodes.push(
      ...getHeaderSectionNodes(HeaderSectionKeyModule.ResponseHeaders, ChatDebugStrings.responseHeaders(), responseHeaders, collapsedHeaderSections),
    )
  }
  return nodes
}
