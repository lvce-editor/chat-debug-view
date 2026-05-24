import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getHeadersContentNodes } from '../src/parts/GetHeadersContentNodes/GetHeadersContentNodes.ts'
import * as HeaderSectionKey from '../src/parts/HeaderSectionKey/HeaderSectionKey.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getHeadersContentNodes should render general, response, and request headers in that order', () => {
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
    subType: 'ai-request',
    type: 'ai-request',
    url: 'https://example.com/chat',
  } as const

  const result = getHeadersContentNodes(responseEventNodes, selectedEvent)

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersSection',
      type: VirtualDomElements.Section,
    },
    {
      ariaExpanded: true,
      childCount: 1,
      className: 'ChatDebugViewHeadersSectionHeading',
      name: InputName.ToggleHeadersSection,
      onChange: DomEventListenerFunctions.HandleFilterInput,
      onClick: DomEventListenerFunctions.HandleFilterInput,
      type: VirtualDomElements.Button,
      value: HeaderSectionKey.General,
    },
    text('General'),
    {
      childCount: 3,
      className: 'ChatDebugViewHeadersTable',
      type: VirtualDomElements.Ul,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersRow ChatDebugViewHeadersRowOdd',
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellName',
      type: VirtualDomElements.Div,
    },
    text('Request URL'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Div,
    },
    text('https://example.com/chat'),
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersRow ChatDebugViewHeadersRowEven',
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellName',
      type: VirtualDomElements.Div,
    },
    text('Request Method'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Div,
    },
    text('POST'),
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersRow ChatDebugViewHeadersRowOdd',
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellName',
      type: VirtualDomElements.Div,
    },
    text('Status Code'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Div,
    },
    text('201 Created'),
    {
      childCount: 3,
      className: 'ChatDebugViewHeadersSection',
      type: VirtualDomElements.Section,
    },
    {
      ariaExpanded: true,
      childCount: 1,
      className: 'ChatDebugViewHeadersSectionHeading',
      name: InputName.ToggleHeadersSection,
      onChange: DomEventListenerFunctions.HandleFilterInput,
      onClick: DomEventListenerFunctions.HandleFilterInput,
      type: VirtualDomElements.Button,
      value: HeaderSectionKey.ResponseHeaders,
    },
    text('Response Headers'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersTable',
      type: VirtualDomElements.Ul,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersRow ChatDebugViewHeadersRowOdd',
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellName',
      type: VirtualDomElements.Div,
    },
    text('Server'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Div,
    },
    text('test-server'),
    {
      childCount: 3,
      className: 'ChatDebugViewHeadersSectionInfo',
      type: VirtualDomElements.Div,
    },
    text('Some headers may not be displayed due to '),
    {
      childCount: 1,
      className: 'ExternalLink',
      href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers',
      rel: 'noopener noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text('Access-Control-Expose-Headers'),
    text(' header.'),
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersSection',
      type: VirtualDomElements.Section,
    },
    {
      ariaExpanded: true,
      childCount: 1,
      className: 'ChatDebugViewHeadersSectionHeading',
      name: InputName.ToggleHeadersSection,
      onChange: DomEventListenerFunctions.HandleFilterInput,
      onClick: DomEventListenerFunctions.HandleFilterInput,
      type: VirtualDomElements.Button,
      value: HeaderSectionKey.RequestHeaders,
    },
    text('Request Headers'),
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersTable',
      type: VirtualDomElements.Ul,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersRow ChatDebugViewHeadersRowOdd',
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellName',
      type: VirtualDomElements.Div,
    },
    text('Authorization'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Div,
    },
    text('Bearer [redacted]'),
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersRow ChatDebugViewHeadersRowEven',
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellName',
      type: VirtualDomElements.Div,
    },
    text('Content-Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Div,
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
    subType: 'ai-request',
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
    subType: 'ai-request',
    type: 'ai-request',
    url: 'https://example.com/chat',
  } as const

  const result = getHeadersContentNodes(responseEventNodes, selectedEvent)

  expect(result[0]).toEqual({
    childCount: 2,
    className: 'ChatDebugViewHeadersSection',
    type: VirtualDomElements.Section,
  })
  expect(result[2]).toEqual(text('General'))
  expect(result).toContainEqual(text('Request URL'))
  expect(result).toContainEqual(text('https://example.com/chat'))
  expect(result).toContainEqual(text('Status Code'))
  expect(result).toContainEqual(text('204 No Content'))
  expect(result).toContainEqual(text('Response Headers'))
  expect(result).toContainEqual(text('Some headers may not be displayed due to '))
  expect(result).toContainEqual(text('Access-Control-Expose-Headers'))
  expect(result).toContainEqual(text(' header.'))
})

test('getHeadersContentNodes should preserve unknown status codes without inventing a label', () => {
  const responseEventNodes = [] as const
  const selectedEvent = {
    endValue: {
      statusCode: 599,
    },
    eventId: 1,
    subType: 'ai-response',
    type: 'ai-response',
  } as const

  const result = getHeadersContentNodes(responseEventNodes, selectedEvent)

  expect(result).toContainEqual(text('Status Code'))
  expect(result).toContainEqual(text('599'))
})

test('getHeadersContentNodes should omit table rows for collapsed sections', () => {
  const responseEventNodes = [] as const
  const selectedEvent = {
    endValue: {
      headers: {
        Server: 'test-server',
      },
      statusCode: 200,
    },
    eventId: 1,
    headers: {
      Authorization: 'Bearer [redacted]',
    },
    method: 'POST',
    subType: 'ai-request',
    type: 'ai-request',
    url: 'https://example.com/chat',
  } as const

  const result = getHeadersContentNodes(responseEventNodes, selectedEvent, [HeaderSectionKey.General])

  expect(result[0]).toEqual({
    childCount: 1,
    className: 'ChatDebugViewHeadersSection',
    type: VirtualDomElements.Section,
  })
  expect(result[1]).toEqual({
    ariaExpanded: false,
    childCount: 1,
    className: 'ChatDebugViewHeadersSectionHeading',
    name: InputName.ToggleHeadersSection,
    onChange: DomEventListenerFunctions.HandleFilterInput,
    onClick: DomEventListenerFunctions.HandleFilterInput,
    type: VirtualDomElements.Button,
    value: HeaderSectionKey.General,
  })
  expect(result).toContainEqual(text('General'))
  expect(result).not.toContainEqual(text('Request URL'))
  expect(result).toContainEqual(text('Request Headers'))
  expect(result).toContainEqual(text('Response Headers'))
  expect(result).toContainEqual(text('Some headers may not be displayed due to '))
  expect(result).toContainEqual(text('Access-Control-Expose-Headers'))
  expect(result).toContainEqual(text(' header.'))
})
