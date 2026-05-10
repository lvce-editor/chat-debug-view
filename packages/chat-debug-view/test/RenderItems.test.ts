import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { ChatDebugViewState } from '../src/parts/State/ChatDebugViewState.ts'
import * as ChatDebugStrings from '../src/parts/ChatDebugStrings/ChatDebugStrings.ts'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('renderItems should not show count for visible events', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const newState: ChatDebugViewState = getStateWithTimelineInfo({
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'handle-input',
      },
    ],
    sessionId: 'session-1',
    showInputEvents: false,
    uid: 1,
  })

  const result = RenderItems.renderItems(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetDom2)
  expect(result[1]).toBe(1)
  expect(Array.isArray(result[2])).toBe(true)
  const dom = result[2] as readonly { readonly text?: string }[]
  const eventCountText = dom.find((node) => node.text === '1 event')
  expect(eventCountText).toBeUndefined()
})

test('renderItems should not show plural count when multiple events are visible', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const newState: ChatDebugViewState = getStateWithTimelineInfo({
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'response',
      },
    ],
    sessionId: 'session-1',
    uid: 2,
  })

  const result = RenderItems.renderItems(oldState, newState)

  const dom = result[2] as readonly { readonly text?: string }[]
  const eventCountText = dom.find((node) => node.text === '2 events')
  expect(eventCountText).toBeUndefined()
})

test('renderItems should show filter-specific message when no events match', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const newState: ChatDebugViewState = getStateWithTimelineInfo({
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
    ],
    filterValue: 'response',
    sessionId: 'session-1',
    uid: 3,
  })

  const result = RenderItems.renderItems(oldState, newState)

  const dom = result[2] as readonly { readonly text?: string }[]
  const noMatchText = dom.find((node) => node.text === ChatDebugStrings.noEventsFoundMatching('response'))
  expect(noMatchText).toBeDefined()
})

test('renderItems should preserve existing eventId values', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const newState: ChatDebugViewState = getStateWithTimelineInfo({
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
    useDevtoolsLayout: false,
  })

  const result = RenderItems.renderItems(oldState, newState)

  const dom = result[2] as readonly { readonly text?: string }[]
  const eventIdKeys = dom.filter((node) => node.text === '"eventId"')
  expect(eventIdKeys).toHaveLength(2)
  expect(dom.some((node) => node.text === '42')).toBe(true)
  expect(dom.some((node) => node.text === '99')).toBe(true)
})

test('renderItems should assign numeric eventId values when they are missing', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const legacyEvents = [
    {
      sessionId: 'session-1',
      timestamp: 'a',
      type: 'request',
    },
    {
      sessionId: 'session-1',
      timestamp: 'b',
      type: 'response',
    },
  ] as unknown as ChatDebugViewState['events']
  const newState: ChatDebugViewState = getStateWithTimelineInfo({
    ...createDefaultState(),
    events: legacyEvents,
    sessionId: 'session-1',
    uid: 5,
    useDevtoolsLayout: false,
  })

  const result = RenderItems.renderItems(oldState, newState)

  const dom = result[2] as readonly { readonly text?: string }[]
  const eventIdKeys = dom.filter((node) => node.text === '"eventId"')
  expect(eventIdKeys).toHaveLength(2)
  expect(dom.some((node) => node.text === '1')).toBe(true)
  expect(dom.some((node) => node.text === '2')).toBe(true)
})

test('renderItems should support ai-request-finished events in devtools layout', () => {
  const oldState: ChatDebugViewState = createDefaultState()
  const mergedEvent = {
    duration: 250,
    endTimestamp: '2026-03-08T00:00:00.250Z',
    ended: '2026-03-08T00:00:00.250Z',
    eventId: 1,
    requestEvent: {
      body: {
        input: [
          {
            content: 'hello from e2e',
            role: 'user',
          },
        ],
        model: 'gpt-5.4',
      },
      eventId: 1,
      headers: {
        'content-type': 'application/json',
      },
      requestId: 'request-1',
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'ai-request',
    },
    requestId: 'request-1',
    requestValue: {
      input: [
        {
          content: 'hello from e2e',
          role: 'user',
        },
      ],
      model: 'gpt-5.4',
    },
    responseEvent: {
      eventId: 2,
      requestId: 'request-1',
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.250Z',
      type: 'ai-response-success',
      value: {
        id: 'resp_1',
        output: [
          {
            content: [
              {
                text: 'hello from merged response',
                type: 'output_text',
              },
            ],
          },
        ],
      },
    },
    responseValue: {
      id: 'resp_1',
      output: [
        {
          content: [
            {
              text: 'hello from merged response',
              type: 'output_text',
            },
          ],
        },
      ],
    },
    sessionId: 'session-1',
    startTimestamp: '2026-03-08T00:00:00.000Z',
    started: '2026-03-08T00:00:00.000Z',
    timestamp: '2026-03-08T00:00:00.250Z',
    type: 'ai-request-finished',
  }
  const newState: ChatDebugViewState = getStateWithTimelineInfo({
    ...createDefaultState(),
    detailTabs: [
      { isSelected: false, label: 'Preview', name: 'preview' },
      { isSelected: false, label: 'Payload', name: 'payload' },
      { isSelected: true, label: 'Response', name: 'response' },
    ],
    events: [mergedEvent],
    selectedEvent: mergedEvent,
    selectedEventId: 1,
    selectedEventIndex: 0,
    sessionId: 'session-1',
    uid: 6,
    useDevtoolsLayout: true,
  })

  const result = RenderItems.renderItems(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetDom2)
  expect(result[1]).toBe(6)
  expect(Array.isArray(result[2])).toBe(true)
})
