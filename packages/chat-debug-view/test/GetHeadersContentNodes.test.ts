import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getHeadersContentNodes } from '../src/parts/GetHeadersContentNodes/GetHeadersContentNodes.ts'

test('getHeadersContentNodes should render request and response headers in separate sections', () => {
  const responseEventNodes = [
    {
      childCount: 1,
      className: 'ResponseNode',
      type: VirtualDomElements.Div,
    },
  ] as const
  const selectedEvent = {
    endValue: {
      headers: {
        Server: 'test-server',
      },
      statusCode: 201,
    },
    eventId: 1,
    headers: {
      Authorization: 'Bearer [redacted]',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    type: 'ai-request',
    url: 'https://example.com/chat',
  } as const

  const result = getHeadersContentNodes(responseEventNodes, selectedEvent)

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersSection',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersSectionHeading',
      type: VirtualDomElements.Div,
    },
    text('General'),
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
      childCount: 3,
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
    text('Request URL'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Td,
    },
    text('https://example.com/chat'),
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
    text('Request Method'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Td,
    },
    text('POST'),
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
    text('Status Code'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Td,
    },
    text('201 Created'),
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersSection',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersSectionHeading',
      type: VirtualDomElements.Div,
    },
    text('Request Headers'),
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
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersSection',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersSectionHeading',
      type: VirtualDomElements.Div,
    },
    text('Response Headers'),
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
      childCount: 1,
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
    text('Server'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Td,
    },
    text('test-server'),
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

test('getHeadersContentNodes should render response headers when request headers are unavailable', () => {
  const responseEventNodes = [] as const
  const selectedEvent = {
    endValue: {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 204,
    },
    eventId: 1,
    type: 'ai-request',
    url: 'https://example.com/chat',
  } as const

  const result = getHeadersContentNodes(responseEventNodes, selectedEvent)

  expect(result[0]).toEqual({
    childCount: 2,
    className: 'ChatDebugViewHeadersSection',
    type: VirtualDomElements.Div,
  })
  expect(result[2]).toEqual(text('General'))
  expect(result).toContainEqual(text('Request URL'))
  expect(result).toContainEqual(text('https://example.com/chat'))
  expect(result).toContainEqual(text('Status Code'))
  expect(result).toContainEqual(text('204 No Content'))
  expect(result).toContainEqual(text('Response Headers'))
})

test('getHeadersContentNodes should preserve unknown status codes without inventing a label', () => {
  const responseEventNodes = [] as const
  const selectedEvent = {
    endValue: {
      statusCode: 599,
    },
    eventId: 1,
    type: 'ai-response',
  } as const

  const result = getHeadersContentNodes(responseEventNodes, selectedEvent)

  expect(result).toContainEqual(text('Status Code'))
  expect(result).toContainEqual(text('599'))
})
