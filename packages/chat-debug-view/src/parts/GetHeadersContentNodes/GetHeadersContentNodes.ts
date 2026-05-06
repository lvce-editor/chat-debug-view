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
  ChatDebugViewHeadersTable,
} from '../ClassNames/ClassNames.ts'

const isHeadersRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const getHeaderValueText = (value: unknown): string => {
  if (typeof value === 'string') {
    return value
  }
  if (value === undefined) {
    return ''
  }
  const json = JSON.stringify(value)
  return json === undefined ? String(value) : json
}

const getHeaders = (selectedEvent: ChatViewEvent | null): readonly [string, unknown][] => {
  if (selectedEvent === null || !isHeadersRecord(selectedEvent.headers)) {
    return []
  }
  return Object.entries(selectedEvent.headers)
}

export const getHeadersContentNodes = (
  responseEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
): readonly VirtualDomNode[] => {
  const headers = getHeaders(selectedEvent)
  if (headers.length === 0) {
    return responseEventNodes
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
    ...headers.flatMap(([headerName, headerValue], index) => {
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
    }),
  ]
}