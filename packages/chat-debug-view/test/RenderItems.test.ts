import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { ChatDebugViewState } from '../src/parts/State/ChatDebugViewState.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('renderItems should show count for visible events', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const newState: ChatDebugViewState = {
    ...createDefaultState(),
    events: [
      {
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'handle-input',
      },
    ],
    sessionId: 'session-1',
    showInputEvents: false,
    uid: 1,
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetDom2)
  expect(result[1]).toBe(1)
  expect(Array.isArray(result[2])).toBe(true)
  const dom = result[2] as readonly { readonly text?: string }[]
  const eventCountText = dom.find((node) => node.text === '1 event')
  expect(eventCountText).toBeDefined()
})

test('renderItems should show plural count when multiple events are visible', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const newState: ChatDebugViewState = {
    ...createDefaultState(),
    events: [
      {
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'response',
      },
    ],
    sessionId: 'session-1',
    uid: 2,
  }

  const result = RenderItems.renderItems(oldState, newState)

  const dom = result[2] as readonly { readonly text?: string }[]
  const eventCountText = dom.find((node) => node.text === '2 events')
  expect(eventCountText).toBeDefined()
})

test('renderItems should show filter-specific message when no events match', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const newState: ChatDebugViewState = {
    ...createDefaultState(),
    events: [
      {
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
    ],
    filterValue: 'response',
    sessionId: 'session-1',
    uid: 3,
  }

  const result = RenderItems.renderItems(oldState, newState)

  const dom = result[2] as readonly { readonly text?: string }[]
  const noMatchText = dom.find((node) => node.text === 'no events found matching response')
  expect(noMatchText).toBeDefined()
})

test('renderItems should use numeric eventId starting at 1 per session', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const newState: ChatDebugViewState = {
    ...createDefaultState(),
    events: [
      {
        eventId: 42,
        sessionId: 'session-1',
        timestamp: 'a',
        type: 'request',
      },
      {
        eventId: 99,
        sessionId: 'session-1',
        timestamp: 'b',
        type: 'response',
      },
    ],
    sessionId: 'session-1',
    uid: 4,
  }

  const result = RenderItems.renderItems(oldState, newState)

  const dom = result[2] as readonly { readonly text?: string }[]
  const eventIdKeys = dom.filter((node) => node.text === '"eventId"')
  expect(eventIdKeys).toHaveLength(2)
  expect(dom.some((node) => node.text === '1')).toBe(true)
  expect(dom.some((node) => node.text === '2')).toBe(true)
  expect(dom.some((node) => node.text === '42')).toBe(false)
  expect(dom.some((node) => node.text === '99')).toBe(false)
})

test('renderItems should compact sse-response-completed output by default', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const newState: ChatDebugViewState = {
    ...createDefaultState(),
    events: [
      {
        sessionId: 'session-1',
        timestamp: '2026-03-13T10:50:32.680Z',
        type: 'sse-response-completed',
        value: {
          response: {
            id: 'resp_123',
            model: 'gpt-4.1-mini-2025-04-14',
            output: [
              {
                id: 'fc_123',
                type: 'function_call',
              },
            ],
            status: 'completed',
          },
        },
      },
    ],
    sessionId: 'session-1',
    uid: 5,
  }

  const result = RenderItems.renderItems(oldState, newState)
  const dom = result[2] as readonly { readonly text?: string }[]

  expect(dom.some((node) => node.text === '"id"')).toBe(true)
  expect(dom.some((node) => node.text === '"model"')).toBe(true)
  expect(dom.some((node) => node.text === '"output"')).toBe(true)
  expect(dom.some((node) => node.text === '"status"')).toBe(false)
})

test('renderItems should keep full sse-response-completed output when enabled', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const newState: ChatDebugViewState = {
    ...createDefaultState(),
    events: [
      {
        sessionId: 'session-1',
        timestamp: '2026-03-13T10:50:32.680Z',
        type: 'sse-response-completed',
        value: {
          response: {
            id: 'resp_123',
            model: 'gpt-4.1-mini-2025-04-14',
            output: [
              {
                id: 'fc_123',
                type: 'function_call',
              },
            ],
            status: 'completed',
          },
        },
      },
    ],
    sessionId: 'session-1',
    showFullOutput: true,
    uid: 6,
  }

  const result = RenderItems.renderItems(oldState, newState)
  const dom = result[2] as readonly { readonly text?: string }[]

  expect(dom.some((node) => node.text === '"status"')).toBe(true)
})
