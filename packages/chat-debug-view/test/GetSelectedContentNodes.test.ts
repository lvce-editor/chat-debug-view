import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getSelectedContentNodes } from '../src/parts/GetSelectedContentNodes/GetSelectedContentNodes.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

const previewEventNodes = [
  {
    childCount: 0,
    className: 'PreviewNode',
    type: VirtualDomElements.Div,
  },
] as const

const payloadEventNodes = [
  {
    childCount: 0,
    className: 'PayloadNode',
    type: VirtualDomElements.Div,
  },
] as const

const responseEventNodes = [
  {
    childCount: 0,
    className: 'ResponseNode',
    type: VirtualDomElements.Div,
  },
] as const

const selectedEvent = {
  ended: '2026-03-08T00:00:01.250Z',
  eventId: 1,
  message: {
    id: 'message-1',
    role: 'user',
    text: 'preview text',
    time: '02:05 PM',
  },
  started: '2026-03-08T00:00:01.000Z',
  subType: 'chat-message-added',
  timestamp: '2026-04-09T12:05:40.910Z',
  type: 'chat-message-added',
} as const

const tokenUsageEvent = {
  eventId: 2,
  subType: 'ai-response',
  type: 'ai-response',
  value: {
    usage: {
      input_tokens: 224,
      input_tokens_details: {
        cached_tokens: 32,
      },
      output_tokens: 5,
    },
  },
} as const

test('getSelectedContentNodes should return token usage content for the tokens tab', () => {
  const result = getSelectedContentNodes(InputName.Tokens, previewEventNodes, payloadEventNodes, responseEventNodes, tokenUsageEvent, null, null)

  expect(result).not.toBe(responseEventNodes)
  expect(result[0]).toEqual(
    expect.objectContaining({
      className: 'ChatDebugViewTiming',
      type: VirtualDomElements.Div,
    }),
  )
})

test('getSelectedContentNodes should return timing content for the timing tab', () => {
  const result = getSelectedContentNodes(InputName.Timing, previewEventNodes, payloadEventNodes, responseEventNodes, selectedEvent, null, null)

  expect(result).not.toBe(responseEventNodes)
  expect(result[0]).toEqual(
    expect.objectContaining({
      className: 'ChatDebugViewTiming',
      type: VirtualDomElements.Div,
    }),
  )
})

test('getSelectedContentNodes should return preview content for the preview tab', () => {
  const result = getSelectedContentNodes(InputName.Preview, previewEventNodes, payloadEventNodes, responseEventNodes, selectedEvent, null, null)

  expect(result).toBe(previewEventNodes)
})

test('getSelectedContentNodes should return payload content for the payload tab', () => {
  const result = getSelectedContentNodes(InputName.Payload, previewEventNodes, payloadEventNodes, responseEventNodes, selectedEvent, null, null)

  expect(result).toBe(payloadEventNodes)
})

test('getSelectedContentNodes should return headers content for the headers tab', () => {
  const eventWithHeaders = {
    eventId: 1,
    headers: {
      Authorization: 'Bearer [redacted]',
    },
    method: 'POST',
    subType: 'ai-request',
    type: 'ai-request',
    url: 'https://example.com/chat',
  } as const

  const result = getSelectedContentNodes(InputName.Headers, previewEventNodes, payloadEventNodes, responseEventNodes, eventWithHeaders, null, null)

  expect(result).not.toBe(responseEventNodes)
  expect(result[0]).toEqual(
    expect.objectContaining({
      className: 'ChatDebugViewHeadersSection',
      type: VirtualDomElements.Section,
    }),
  )
  expect(result[2]).toEqual(expect.objectContaining({ text: 'General' }))
  expect(result[3]).toEqual(
    expect.objectContaining({
      className: 'ChatDebugViewHeadersTable',
      type: VirtualDomElements.Ul,
    }),
  )
})

test('getSelectedContentNodes should return response content for the response tab', () => {
  const result = getSelectedContentNodes(InputName.Response, previewEventNodes, payloadEventNodes, responseEventNodes, selectedEvent, null, null)

  expect(result).toBe(responseEventNodes)
})
