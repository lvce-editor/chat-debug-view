import { expect, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as GetFilteredEvents from '../src/parts/GetFilteredEvents/GetFilteredEvents.ts'

const getCategoryFilters = (selectedEventCategoryFilters: readonly string[]) => {
  return EventCategoryFilter.getSelectedCategoryFilters(EventCategoryFilter.createCategoryFilters(selectedEventCategoryFilters))
}

const events: readonly ChatViewEvent[] = [
  {
    eventId: 1,
    name: 'filter',
    sessionId: 'session-1',
    subType: 'handle-input',
    timestamp: '2026-01-01T10:00:00.000Z',
    type: 'handle-input',
  },
  {
    eventId: 2,
    sessionId: 'session-1',
    subType: 'handle-submit',
    timestamp: '2026-01-01T10:00:30.000Z',
    type: 'handle-submit',
    value: 'hello',
  },
  {
    eventId: 3,
    path: '/chat',
    sessionId: 'session-1',
    subType: 'request',
    timestamp: '2026-01-01T10:01:00.000Z',
    type: 'request',
  },
  {
    arguments: {
      path: '/tmp/file.txt',
    },
    eventId: 4,
    sessionId: 'session-1',
    subType: 'tool-execution-started',
    timestamp: '2026-01-01T10:01:30.000Z',
    toolName: 'read_file',
    type: 'tool-execution-started',
  },
  {
    eventId: 4,
    output: {
      contents: 'hello',
    },
    sessionId: 'session-1',
    subType: 'tool-execution-finished',
    timestamp: '2026-01-01T10:01:45.000Z',
    toolName: 'read_file',
    type: 'tool-execution-finished',
  },
  {
    eventId: 5,
    sessionId: 'session-1',
    subType: 'sse-response-part',
    timestamp: '2026-01-01T10:02:00.000Z',
    type: 'sse-response-part',
    value: {
      type: 'response.output_text.delta',
    },
  },
  {
    eventId: 6,
    sessionId: 'session-1',
    subType: 'event-stream-finished',
    timestamp: '2026-01-01T10:03:00.000Z',
    type: 'event-stream-finished',
  },
]

test('getFilteredEvents should hide input events when showInputEvents is false', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '', getCategoryFilters([EventCategoryFilter.All]), false, true, false)
  expect(result).toHaveLength(4)
  expect(result[0].type).toBe('handle-submit')
  expect(result.some((event) => event.type === 'handle-input')).toBe(false)
  expect(result.some((event) => event.type === 'handle-submit')).toBe(true)
})

test('getFilteredEvents should hide response part events when showResponsePartEvents is false', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '', getCategoryFilters([EventCategoryFilter.All]), true, false, false)
  expect(result).toHaveLength(4)
  expect(result.some((event) => event.type === 'request')).toBe(true)
  expect(result.some((event) => event.type === 'sse-response-part')).toBe(false)
})

test('getFilteredEvents should hide event-stream-finished events by default', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '', getCategoryFilters([EventCategoryFilter.All]), true, true, false)
  expect(result.some((event) => event.type === 'event-stream-finished')).toBe(false)
})

test('getFilteredEvents should show event-stream-finished events when enabled', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '', getCategoryFilters([EventCategoryFilter.All]), true, true, true)
  expect(result.some((event) => event.type === 'event-stream-finished')).toBe(true)
})

test('getFilteredEvents should filter by normalized search text', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '  REQUEST  ', getCategoryFilters([EventCategoryFilter.All]), true, true, true)
  expect(result).toHaveLength(1)
  expect(result[0].type).toBe('request')
})

test('getFilteredEvents should return all visible events when filter is empty', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '   ', getCategoryFilters([EventCategoryFilter.All]), true, true, true)
  expect(result).toHaveLength(6)
})

test('getFilteredEvents should treat @tools as plain text in the filter input', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '@tools', getCategoryFilters([EventCategoryFilter.All]), true, true, true)
  expect(result).toEqual([])
})

test('getFilteredEvents should treat category tokens as plain text when combined with search text', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '  @TOOLS hello  ', getCategoryFilters([EventCategoryFilter.All]), true, true, true)
  expect(result).toEqual([])
})

test('getFilteredEvents should prefer finished event payload for merged tool previews when tool pills are selected', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '', getCategoryFilters([EventCategoryFilter.Tools]), true, true, true)

  expect(result).toEqual([
    expect.objectContaining({
      output: {
        contents: 'hello',
      },
    }),
  ])
  expect(result[0]).not.toHaveProperty('timestamp', '2026-01-01T10:01:30.000Z')
})

test('getFilteredEvents should show only network events for network category filter', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '', getCategoryFilters([EventCategoryFilter.Network]), true, true, true)
  expect(result).toEqual([events[2]])
})

test('getFilteredEvents should include merged ai request response events for network category filter', () => {
  const requestEvent = {
    eventId: 7,
    requestId: 'request-7',
    sessionId: 'session-1',
    subType: 'ai-request',
    timestamp: '2026-01-01T10:04:00.000Z',
    type: 'ai-request',
  }
  const responseEvent = {
    eventId: 8,
    requestId: 'request-7',
    response: {
      id: 'resp_7',
    },
    sessionId: 'session-1',
    subType: 'ai-response-success',
    timestamp: '2026-01-01T10:04:01.250Z',
    type: 'ai-response-success',
  }

  const result = GetFilteredEvents.getFilteredEvents(
    [requestEvent, responseEvent],
    '',
    getCategoryFilters([EventCategoryFilter.Network]),
    true,
    true,
    true,
  )

  expect(result).toEqual([
    {
      ended: '2026-01-01T10:04:01.250Z',
      eventId: 7,
      requestEvent,
      requestId: 'request-7',
      response: {
        id: 'resp_7',
      },
      responseEvent,
      sessionId: 'session-1',
      size: 15,
      started: '2026-01-01T10:04:00.000Z',
      subType: 'ai-request',
      timestamp: '2026-01-01T10:04:01.250Z',
      type: 'ai-request',
    },
  ])
})

test('getFilteredEvents should show events from multiple selected category filters', () => {
  const result = GetFilteredEvents.getFilteredEvents(
    events,
    '',
    getCategoryFilters([EventCategoryFilter.Tools, EventCategoryFilter.Network]),
    true,
    true,
    true,
  )

  expect(result).toEqual([
    events[2],
    expect.objectContaining({
      toolName: 'read_file',
      type: 'tool-execution',
    }),
  ])
})

test('getFilteredEvents should include tool-request-response events for tools category filter', () => {
  const toolRequestResponseEvent: ChatViewEvent = {
    durationMs: 40,
    ended: '2026-01-01T10:05:00.040Z',
    eventEndId: 10,
    eventId: 9,
    method: 'POST',
    size: 0,
    started: '2026-01-01T10:05:00.000Z',
    status: 200,
    subType: 'write_file',
    timestamp: '2026-01-01T10:05:00.000Z',
    type: 'tool-request-response',
  }

  const result = GetFilteredEvents.getFilteredEvents(
    [toolRequestResponseEvent],
    '',
    getCategoryFilters([EventCategoryFilter.Tools]),
    true,
    true,
    true,
  )

  expect(result).toEqual([toolRequestResponseEvent])
})

test('getFilteredEvents should collapse matching ai-request and ai-response-success events', () => {
  const requestEvent = {
    eventId: 7,
    requestId: 'request-7',
    sessionId: 'session-1',
    subType: 'ai-request',
    timestamp: '2026-01-01T10:04:00.000Z',
    type: 'ai-request',
  }
  const responseEvent = {
    eventId: 8,
    requestId: 'request-7',
    response: {
      id: 'resp_7',
    },
    sessionId: 'session-1',
    subType: 'ai-response-success',
    timestamp: '2026-01-01T10:04:01.250Z',
    type: 'ai-response-success',
  }

  const result = GetFilteredEvents.getFilteredEvents(
    [requestEvent, responseEvent],
    '',
    getCategoryFilters([EventCategoryFilter.All]),
    true,
    true,
    true,
  )

  expect(result).toEqual([
    {
      ended: '2026-01-01T10:04:01.250Z',
      eventId: 7,
      requestEvent,
      requestId: 'request-7',
      response: {
        id: 'resp_7',
      },
      responseEvent,
      sessionId: 'session-1',
      size: 15,
      started: '2026-01-01T10:04:00.000Z',
      subType: 'ai-request',
      timestamp: '2026-01-01T10:04:01.250Z',
      type: 'ai-request',
    },
  ])
})

test('getFilteredEvents should match using the selected category filter eventTypes', () => {
  const customCategoryFilters = [
    {
      eventTypes: ['request'],
      isSelected: true,
      label: 'Requests',
      name: 'requests',
    },
  ]

  const result = GetFilteredEvents.getFilteredEvents(events, '', customCategoryFilters, true, true, true)

  expect(result).toEqual([events[2]])
})
