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

test('collapseToolExecutionEvents should merge handle-submit and sse-response-completed events', () => {
  const startedEvent: ChatViewEvent = {
    eventId: 41,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:30.000Z',
    type: 'handle-submit',
    value: 'hello',
  }
  const finishedEvent: ChatViewEvent = {
    eventId: 42,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:45.000Z',
    type: 'sse-response-completed',
    value: {
      type: 'response.completed',
    },
  }

  const result = collapseToolExecutionEvents([startedEvent, finishedEvent])

  expect(result).toEqual([
    {
      ended: '2026-01-01T10:01:45.000Z',
      eventId: 41,
      sessionId: 'session-1',
      started: '2026-01-01T10:01:30.000Z',
      timestamp: '2026-01-01T10:01:45.000Z',
      type: 'handle-submit',
      value: {
        type: 'response.completed',
      },
    },
  ])
})

test('collapseToolExecutionEvents should keep non-adjacent handle-submit and sse-response-completed events separate', () => {
  const startedEvent: ChatViewEvent = {
    eventId: 41,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:30.000Z',
    type: 'handle-submit',
  }
  const middleEvent: ChatViewEvent = {
    eventId: 99,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:31.000Z',
    type: 'chat-message-added',
  }
  const finishedEvent: ChatViewEvent = {
    eventId: 42,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:45.000Z',
    type: 'sse-response-completed',
  }

  const result = collapseToolExecutionEvents([startedEvent, middleEvent, finishedEvent])

  expect(result).toEqual([startedEvent, middleEvent, finishedEvent])
})

test('collapseToolExecutionEvents should merge matching request and response events', () => {
  const startedEvent: ChatViewEvent = {
    eventId: 9,
    requestId: 'request-1',
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:30.000Z',
    type: 'request',
  }
  const finishedEvent: ChatViewEvent = {
    eventId: 10,
    requestId: 'request-1',
    response: {
      id: 'resp_1',
    },
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:01:45.000Z',
    type: 'response',
  }

  const result = collapseToolExecutionEvents([startedEvent, finishedEvent])

  expect(result).toEqual([
    {
      ended: '2026-01-01T10:01:45.000Z',
      eventId: 9,
      requestEvent: startedEvent,
      requestId: 'request-1',
      response: {
        id: 'resp_1',
      },
      responseEvent: finishedEvent,
      sessionId: 'session-1',
      started: '2026-01-01T10:01:30.000Z',
      timestamp: '2026-01-01T10:01:45.000Z',
      type: 'request',
    },
  ])
})

test('collapseToolExecutionEvents should merge matching ai-request and ai-response events', () => {
  const startedEvent: ChatViewEvent = {
    eventId: 11,
    requestId: 'request-11',
    sessionId: 'session-1',
    timestamp: '2026-04-19T12:00:00.000Z',
    type: 'ai-request',
  }
  const finishedEvent: ChatViewEvent = {
    eventId: 12,
    requestId: 'request-11',
    response: {
      id: 'resp_11',
    },
    sessionId: 'session-1',
    timestamp: '2026-04-19T12:00:00.004Z',
    type: 'ai-response',
  }

  const result = collapseToolExecutionEvents([startedEvent, finishedEvent])

  expect(result).toEqual([
    {
      ended: '2026-04-19T12:00:00.004Z',
      eventId: 11,
      requestEvent: startedEvent,
      requestId: 'request-11',
      response: {
        id: 'resp_11',
      },
      responseEvent: finishedEvent,
      sessionId: 'session-1',
      started: '2026-04-19T12:00:00.000Z',
      timestamp: '2026-04-19T12:00:00.004Z',
      type: 'ai-request',
    },
  ])
})
