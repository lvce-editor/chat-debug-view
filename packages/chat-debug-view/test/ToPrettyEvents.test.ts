import { expect, test } from '@jest/globals'
import { toPrettyEvents } from '../src/parts/ToPrettyEvents/ToPrettyEvents.ts'

test('toPrettyEvents should include duration for merged ai request and ai response events', () => {
  const requestEvent = {
    eventId: 1,
    requestId: 'request-1',
    timestamp: '2026-05-12T10:00:00.000Z',
    type: 'ai-request',
  }
  const responseEvent = {
    eventId: 2,
    requestId: 'request-1',
    timestamp: '2026-05-12T10:00:00.125Z',
    type: 'ai-response',
    value: 'abcdefghij',
  }

  const result = toPrettyEvents({
    events: [requestEvent, responseEvent],
    type: 'success',
  })

  expect(result).toEqual([
    {
      durationMs: 125,
      ended: '2026-05-12T10:00:00.125Z',
      eventEndId: 2,
      eventId: 1,
      method: 'POST',
      size: 10,
      started: '2026-05-12T10:00:00.000Z',
      subType: 'ai-request-response',
      timestamp: '2026-05-12T10:00:00.000Z',
      type: 'ai-request-response',
    },
  ])
})

test('toPrettyEvents should preserve merged event timing metadata for the timeline', () => {
  const requestEvent = {
    eventId: 1,
    requestId: 'request-1',
    timestamp: '2026-05-12T10:00:00.000Z',
    type: 'ai-request',
  }
  const responseEvent = {
    eventId: 2,
    requestId: 'request-1',
    timestamp: '2026-05-12T10:00:00.125Z',
    type: 'ai-response',
    value: 'abcdefghij',
  }

  const [result] = toPrettyEvents({
    events: [requestEvent, responseEvent],
    type: 'success',
  })

  expect(result?.timestamp).toBe('2026-05-12T10:00:00.000Z')
  expect(result?.started).toBe('2026-05-12T10:00:00.000Z')
  expect(result?.ended).toBe('2026-05-12T10:00:00.125Z')
})

test('toPrettyEvents should merge matching ai request and ai response events', () => {
  const requestEvent = {
    eventId: 1,
    requestId: 'request-1',
    type: 'ai-request',
  }
  const responseEvent = {
    eventId: 2,
    requestId: 'request-1',
    type: 'ai-response',
    value: 'abcdefghij',
  }

  const result = toPrettyEvents({
    events: [requestEvent, responseEvent],
    type: 'success',
  })

  expect(result).toEqual([
    {
      eventEndId: 2,
      eventId: 1,
      method: 'POST',
      size: 10,
      subType: 'ai-request-response',
      type: 'ai-request-response',
    },
  ])
})

test('toPrettyEvents should use the tool name as subtype for merged tool call events', () => {
  const requestEvent = {
    eventId: 1,
    requestId: 'request-1',
    timestamp: '2026-05-12T10:00:00.000Z',
    toolName: 'write_file',
    type: 'tool-call-started',
  }
  const responseEvent = {
    eventId: 2,
    requestId: 'request-1',
    timestamp: '2026-05-12T10:00:00.125Z',
    toolCallResult: {
      ok: true,
    },
    type: 'tool-call-finished',
    value: 'abcdefghij',
  }

  const result = toPrettyEvents({
    events: [requestEvent, responseEvent],
    type: 'success',
  })

  expect(result).toEqual([
    {
      durationMs: 125,
      ended: '2026-05-12T10:00:00.125Z',
      eventEndId: 2,
      eventId: 1,
      method: 'POST',
      size: 10,
      started: '2026-05-12T10:00:00.000Z',
      status: 200,
      subType: 'write_file',
      timestamp: '2026-05-12T10:00:00.000Z',
      type: 'tool-request-response',
    },
  ])
})

test('toPrettyEvents should keep merged size at zero when response payload is missing', () => {
  const requestEvent = {
    eventId: 1,
    requestId: 'request-1',
    type: 'ai-request',
  }
  const responseEvent = {
    eventId: 2,
    requestId: 'request-1',
    type: 'ai-response',
  }

  const [result] = toPrettyEvents({
    events: [requestEvent, responseEvent],
    type: 'success',
  })

  expect(result?.size).toBe(0)
})

test('toPrettyEvents should keep unmatched and non ai response events', () => {
  const requestEvent = {
    eventId: 1,
    requestId: 'request-1',
    type: 'ai-request',
  }
  const nonMatchingResponseEvent = {
    eventId: 2,
    requestId: 'request-2',
    type: 'ai-response',
  }
  const regularEvent = {
    eventId: 3,
    type: 'request',
  }

  const result = toPrettyEvents({
    events: [requestEvent, nonMatchingResponseEvent, regularEvent],
    type: 'success',
  })

  expect(result).toEqual([requestEvent, regularEvent])
})

test('toPrettyEvents should return empty array for error results', () => {
  const result = toPrettyEvents({
    error: new Error('failed'),
    type: 'error',
  })

  expect(result).toEqual([])
})
