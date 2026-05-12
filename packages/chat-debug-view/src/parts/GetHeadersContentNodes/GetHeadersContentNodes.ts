import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import {
  ChatDebugViewHeadersBody,
  ChatDebugViewHeadersCell,
  ChatDebugViewHeadersCellName,
  ChatDebugViewHeadersCellValue,
  ChatDebugViewHeadersHead,
  ChatDebugViewHeadersRow,
  ChatDebugViewHeadersRowEven,
  ChatDebugViewHeadersRowOdd,
  ChatDebugViewHeadersSection,
  ChatDebugViewHeadersSectionHeading,
  ChatDebugViewHeadersTable,
} from '../ClassNames/ClassNames.ts'

const isHeadersRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
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

const getHeaders = (value: unknown): readonly [string, unknown][] => {
  if (!isHeadersRecord(value)) {
    return []
  }
  return Object.entries(value)
}

const getHeaderRowNodes = (headerName: string, headerValue: unknown, index: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: mergeClassNames(ChatDebugViewHeadersRow, index % 2 === 0 ? ChatDebugViewHeadersRowOdd : ChatDebugViewHeadersRowEven),
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: mergeClassNames(ChatDebugViewHeadersCell, ChatDebugViewHeadersCellName),
      type: VirtualDomElements.Td,
    },
    text(headerName),
    {
      childCount: 1,
      className: mergeClassNames(ChatDebugViewHeadersCell, ChatDebugViewHeadersCellValue),
      type: VirtualDomElements.Td,
    },
    text(getHeaderValueText(headerValue)),
  ]
}

const getHeadersTableNodes = (headers: readonly [string, unknown][]): readonly VirtualDomNode[] => {
  const headerRows: VirtualDomNode[] = []
  for (const [index, [headerName, headerValue]] of headers.entries()) {
    headerRows.push(...getHeaderRowNodes(headerName, headerValue, index))
  }
  return [
    {
      childCount: 2,
      className: ChatDebugViewHeadersTable,
      type: VirtualDomElements.Table,
    },
    {
      childCount: 1,
      className: ChatDebugViewHeadersHead,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 2,
      className: ChatDebugViewHeadersRow,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: mergeClassNames(ChatDebugViewHeadersCell, ChatDebugViewHeadersCellName),
      type: VirtualDomElements.Th,
    },
    text(ChatDebugStrings.name()),
    {
      childCount: 1,
      className: mergeClassNames(ChatDebugViewHeadersCell, ChatDebugViewHeadersCellValue),
      type: VirtualDomElements.Th,
    },
    text(ChatDebugStrings.value()),
    {
      childCount: headers.length,
      className: ChatDebugViewHeadersBody,
      type: VirtualDomElements.TBody,
    },
    ...headerRows,
  ]
}

const getHeaderSectionNodes = (label: string, headers: readonly [string, unknown][]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ChatDebugViewHeadersSection,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ChatDebugViewHeadersSectionHeading,
      type: VirtualDomElements.Div,
    },
    text(label),
    ...getHeadersTableNodes(headers),
  ]
}

export const getHeadersContentNodes = (
  responseEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
): readonly VirtualDomNode[] => {
  const requestHeaders = getHeaders(selectedEvent?.headers)
  const responseHeaders = getHeaders(isHeadersRecord(selectedEvent?.endValue) ? selectedEvent.endValue.headers : undefined)
  if (requestHeaders.length === 0 && responseHeaders.length === 0) {
    return responseEventNodes
  }
  const nodes: VirtualDomNode[] = []
  if (requestHeaders.length > 0) {
    nodes.push(...getHeaderSectionNodes(ChatDebugStrings.requestHeaders(), requestHeaders))
  }
  if (responseHeaders.length > 0) {
    nodes.push(...getHeaderSectionNodes(ChatDebugStrings.responseHeaders(), responseHeaders))
  }
  return nodes
}
