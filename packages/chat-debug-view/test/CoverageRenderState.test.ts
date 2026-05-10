import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import * as ApplyRender from '../src/parts/ApplyRender/ApplyRender.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'
import { renderIncremental } from '../src/parts/RenderIncremental/RenderIncremental.ts'
import { rerender } from '../src/parts/Rerender/Rerender.ts'
import { setEvents } from '../src/parts/SetEvents/SetEvents.ts'
import * as ChatDebugViewStates from '../src/parts/State/ChatDebugViewStates.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('applyRender should return an empty array when there are no diff items', () => {
  const state = {
    ...createDefaultState(),
    uid: 7,
  }

  expect(ApplyRender.applyRender(state, state, [])).toEqual([])
})

test('applyRender should return commands for each diff item', () => {
  const oldState = {
    ...createDefaultState(),
    initial: true,
    uid: 7,
  }
  const newState = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-01-01T00:00:00.000Z',
        type: 'request',
      },
    ],
    uid: 7,
  }

  const result = ApplyRender.applyRender(oldState, newState, [DiffType.RenderCss, DiffType.RenderItems])

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual([ViewletCommand.SetCss, 7, expect.any(String)])
  expect(result[1]).toEqual([ViewletCommand.SetDom2, 7, expect.any(Array)])
})

test('diff2 should diff the stored old and new state', () => {
  const uid = 201
  Create.create(uid, 'file:///debug', 0, 0, 300, 200, 0, '/assets')
  const { newState, oldState } = ChatDebugViewStates.get(uid)

  ChatDebugViewStates.set(uid, oldState, {
    ...newState,
    filterValue: 'error',
  })

  expect(Diff2.diff2(uid)).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('render2 should apply renderers and advance the stored old state', () => {
  const uid = 202
  Create.create(uid, 'file:///debug', 0, 0, 300, 200, 0, '/assets')
  const { newState, oldState } = ChatDebugViewStates.get(uid)
  const updatedState = {
    ...newState,
    filterValue: 'warning',
  }
  ChatDebugViewStates.set(uid, oldState, updatedState)

  const result = render2(uid, [DiffType.RenderCss])
  const stored = ChatDebugViewStates.get(uid)

  expect(result).toEqual([[ViewletCommand.SetCss, uid, expect.any(String)]])
  expect(stored.oldState.filterValue).toBe('warning')
  expect(stored.newState.filterValue).toBe('warning')
})

test('renderCss should create a SetCss command', () => {
  const state = {
    ...createDefaultState(),
    uid: 5,
  }

  expect(renderCss(state, state)).toEqual([ViewletCommand.SetCss, 5, expect.any(String)])
})

test('renderIncremental should create an empty patch set for identical states', () => {
  const state = {
    ...createDefaultState(),
    uid: 9,
  }

  expect(renderIncremental(state, state)).toEqual([ViewletCommand.SetPatches, 9, []])
})

test('rerender should clone state deeply', () => {
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-01-01T00:00:00.000Z',
        type: 'request',
      },
    ],
  }

  const result = rerender(state)

  expect(result).toEqual(state)
  expect(result).not.toBe(state)
  expect(result.events).not.toBe(state.events)
})

test('setEvents should replace events and reset transient state', () => {
  const result = setEvents(
    {
      ...createDefaultState(),
      errorMessage: 'old error',
      initial: true,
      selectedEventIndex: 4,
    },
    [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-01-01T00:00:00.000Z',
        type: 'response',
      },
    ],
  )

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...createDefaultState(),
      errorMessage: '',
      events: [
        {
          eventId: 1,
          sessionId: 'session-1',
          timestamp: '2026-01-01T00:00:00.000Z',
          type: 'response',
        },
      ],
      initial: false,
      selectedEventIndex: null,
    }),
  )
})

test('renderIncremental should support ai-request-finished events', () => {
  const oldState = {
    ...createDefaultState(),
    uid: 10,
  }
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
  const newState = getStateWithTimelineInfo({
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
    uid: 10,
    useDevtoolsLayout: true,
  })

  expect(renderIncremental(oldState, newState)).toEqual([ViewletCommand.SetPatches, 10, expect.any(Array)])
})
