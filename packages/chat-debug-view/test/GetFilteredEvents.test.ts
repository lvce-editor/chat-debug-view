import { expect, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as GetFilteredEvents from '../src/parts/GetFilteredEvents/GetFilteredEvents.ts'

const events: readonly ChatViewEvent[] = [
  {
    name: 'filter',
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:00.000Z',
    type: 'handle-input',
  },
  {
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:30.000Z',
    type: 'handle-submit',
    value: 'hello',
  },
  {
    path: '/chat',
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:00.000Z',
    type: 'request',
  },
  {
    arguments: {
      path: '/tmp/file.txt',
    },
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:30.000Z',
    toolName: 'read_file',
    type: 'tool-execution-started',
  },
  {
    output: {
      contents: 'hello',
    },
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:45.000Z',
    toolName: 'read_file',
    type: 'tool-execution-finished',
  },
  {
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:02:00.000Z',
    type: 'sse-response-part',
    value: {
      type: 'response.output_text.delta',
    },
  },
  {
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:03:00.000Z',
    type: 'event-stream-finished',
  },
]

test('getFilteredEvents should hide input events when showInputEvents is false', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '', EventCategoryFilter.All, false, true, false)
  expect(result).toHaveLength(3)
  expect(result[0].type).toBe('request')
  expect(result.some((event) => event.type === 'handle-submit')).toBe(false)
})

test('getFilteredEvents should hide response part events when showResponsePartEvents is false', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '', EventCategoryFilter.All, true, false, false)
  expect(result).toHaveLength(4)
  expect(result.some((event) => event.type === 'request')).toBe(true)
  expect(result.some((event) => event.type === 'sse-response-part')).toBe(false)
})

test('getFilteredEvents should hide event-stream-finished events by default', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '', EventCategoryFilter.All, true, true, false)
  expect(result.some((event) => event.type === 'event-stream-finished')).toBe(false)
})

test('getFilteredEvents should show event-stream-finished events when enabled', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '', EventCategoryFilter.All, true, true, true)
  expect(result.some((event) => event.type === 'event-stream-finished')).toBe(true)
})

test('getFilteredEvents should filter by normalized search text', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '  REQUEST  ', EventCategoryFilter.All, true, true, true)
  expect(result).toHaveLength(1)
  expect(result[0].type).toBe('request')
})

test('getFilteredEvents should return all visible events when filter is empty', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '   ', EventCategoryFilter.All, true, true, true)
  expect(result).toHaveLength(6)
})

test('getFilteredEvents should show only tool execution events for @tools filter', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '@tools', EventCategoryFilter.All, true, true, true)
  expect(result).toHaveLength(1)
  expect(result).toEqual([
    expect.objectContaining({
      arguments: {
        path: '/tmp/file.txt',
      },
      ended: '2026-01-01T10:01:45.000Z',
      output: {
        contents: 'hello',
      },
      started: '2026-01-01T10:01:30.000Z',
      toolName: 'read_file',
      type: 'tool-execution',
    }),
  ])
})

test('getFilteredEvents should combine @tools filter with text search', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '  @TOOLS hello  ', EventCategoryFilter.All, true, true, true)
  expect(result).toHaveLength(1)
  expect(result[0].type).toBe('tool-execution')
})

test('getFilteredEvents should prefer finished event payload for merged tool previews', () => {
  const result = GetFilteredEvents.getFilteredEvents(events, '@tools', EventCategoryFilter.All, true, true, true)

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
  const result = GetFilteredEvents.getFilteredEvents(events, '', EventCategoryFilter.Network, true, true, true)
  expect(result).toEqual([events[2]])
})
