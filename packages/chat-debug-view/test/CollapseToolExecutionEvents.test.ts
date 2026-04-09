import { expect, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { collapseToolExecutionEvents } from '../src/parts/CollapseToolExecutionEvents/CollapseToolExecutionEvents.ts'

test('collapseToolExecutionEvents should merge matching started and finished events', () => {
  const startedEvent: ChatViewEvent = {
    arguments: {
      path: '/tmp/file.txt',
    },
    eventId: 7,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:30.000Z',
    toolName: 'read_file',
    type: 'tool-execution-started',
  }
  const finishedEvent: ChatViewEvent = {
    eventId: 7,
    output: {
      contents: 'hello',
    },
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:45.000Z',
    toolName: 'read_file',
    type: 'tool-execution-finished',
  }

  const result = collapseToolExecutionEvents([startedEvent, finishedEvent])

  expect(result).toEqual([
    {
      arguments: {
        path: '/tmp/file.txt',
      },
      ended: '2026-01-01T10:01:45.000Z',
      eventId: 7,
      output: {
        contents: 'hello',
      },
      sessionId: 'session-1',
      started: '2026-01-01T10:01:30.000Z',
      timestamp: '2026-01-01T10:01:45.000Z',
      toolName: 'read_file',
      type: 'tool-execution',
    },
  ])
})

test('collapseToolExecutionEvents should keep non-matching events separate', () => {
  const startedEvent: ChatViewEvent = {
    eventId: 0,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:30.000Z',
    toolName: 'read_file',
    type: 'tool-execution-started',
  }
  const finishedEvent: ChatViewEvent = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:45.000Z',
    toolName: 'write_file',
    type: 'tool-execution-finished',
  }

  const result = collapseToolExecutionEvents([startedEvent, finishedEvent])

  expect(result).toEqual([startedEvent, finishedEvent])
})
