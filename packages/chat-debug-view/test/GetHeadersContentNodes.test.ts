import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getHeadersContentNodes } from '../src/parts/GetHeadersContentNodes/GetHeadersContentNodes.ts'

test('getHeadersContentNodes should render ai-request headers in a table', () => {
  const responseEventNodes = [
    {
      childCount: 1,
      className: 'ResponseNode',
      type: VirtualDomElements.Div,
    },
  ] as const
  const selectedEvent = {
    eventId: 1,
    headers: {
      Authorization: 'Bearer [redacted]',
      'Content-Type': 'application/json',
    },
    type: 'ai-request',
  } as const

  const result = getHeadersContentNodes(responseEventNodes, selectedEvent)

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersTable',
      type: VirtualDomElements.Table,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersHead',
      type: VirtualDomElements.THead,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellName',
      type: VirtualDomElements.Th,
    },
    text('Name'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Th,
    },
    text('Value'),
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersBody',
      type: VirtualDomElements.TBody,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersRow ChatDebugViewHeadersRowOdd',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellName',
      type: VirtualDomElements.Td,
    },
    text('Authorization'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Td,
    },
    text('Bearer [redacted]'),
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersRow ChatDebugViewHeadersRowEven',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellName',
      type: VirtualDomElements.Td,
    },
    text('Content-Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Td,
    },
    text('application/json'),
  ])
})

test('getHeadersContentNodes should fall back to the response nodes when there are no headers', () => {
  const responseEventNodes = [
    {
      childCount: 1,
      className: 'ResponseNode',
      type: VirtualDomElements.Div,
    },
  ] as const

  const result = getHeadersContentNodes(responseEventNodes, null)

  expect(result).toBe(responseEventNodes)
})

test('getHeadersContentNodes should stringify structured header values', () => {
  const responseEventNodes = [] as const
  const selectedEvent = {
    eventId: 1,
    headers: {
      Meta: {
        nested: true,
      },
    },
    type: 'ai-request',
  } as const

  const result = getHeadersContentNodes(responseEventNodes, selectedEvent)

  expect(result.at(-1)).toEqual(text('{"nested":true}'))
})
