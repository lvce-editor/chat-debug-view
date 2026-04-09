import { expect, test } from '@jest/globals'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { getLightweightEvent } from '../src/parts/GetLightweightEvent/GetLightweightEvent.ts'
import { getTimelineFilterDescription } from '../src/parts/GetTimelineFilterDescription/GetTimelineFilterDescription.ts'
import { handleSashPointerDown } from '../src/parts/HandleSashPointerDown/HandleSashPointerDown.ts'
import { handleSashPointerUp } from '../src/parts/HandleSashPointerUp/HandleSashPointerUp.ts'
import { hasErrorStatus } from '../src/parts/HasErrorStatus/HasErrorStatus.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getEventCategoryFilterLabel should return labels for all known filters and fallback to all', () => {
  expect(EventCategoryFilter.getEventCategoryFilterLabel(EventCategoryFilter.Network)).toBe('Network')
  expect(EventCategoryFilter.getEventCategoryFilterLabel(EventCategoryFilter.Stream)).toBe('Stream')
  expect(EventCategoryFilter.getEventCategoryFilterLabel(EventCategoryFilter.Tools)).toBe('Tools')
  expect(EventCategoryFilter.getEventCategoryFilterLabel(EventCategoryFilter.Ui)).toBe('UI')
  expect(EventCategoryFilter.getEventCategoryFilterLabel('unknown')).toBe('All')
})

test('getLightweightEvent should keep only summary fields', () => {
  const event = {
    durationMs: 7,
    error: 'ignored',
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-01-01T00:00:00.000Z',
    type: 'request',
  }
  Reflect.deleteProperty(event, 'eventId')
  const result = getLightweightEvent(event, 5)

  expect(result).toEqual({
    duration: 7,
    endTime: '2026-01-01T00:00:00.000Z',
    eventId: 5,
    startTime: '2026-01-01T00:00:00.000Z',
    type: 'request',
  })
})

test('getTimelineFilterDescription should describe explicit start and end', () => {
  expect(getTimelineFilterDescription(' 5 ', ' 9 ')).toBe('5s-9s')
})

test('getTimelineFilterDescription should describe only start', () => {
  expect(getTimelineFilterDescription(' 5 ', '  ')).toBe('from 5s')
})

test('getTimelineFilterDescription should describe only end', () => {
  expect(getTimelineFilterDescription(' ', ' 9 ')).toBe('to 9s')
})

test('getTimelineFilterDescription should return empty string when there is no range', () => {
  expect(getTimelineFilterDescription(' ', ' ')).toBe('')
})

test('hasErrorStatus should return true for error events', () => {
  expect(
    hasErrorStatus({
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'error',
    }),
  ).toBe(true)
})

test('hasErrorStatus should return true when success or ok is false', () => {
  expect(
    hasErrorStatus({
      eventId: 1,
      sessionId: 'session-1',
      success: false,
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)

  expect(
    hasErrorStatus({
      eventId: 2,
      ok: false,
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)
})

test('hasErrorStatus should return true for numeric and string status codes >= 400', () => {
  expect(
    hasErrorStatus({
      eventId: 1,
      sessionId: 'session-1',
      status: 500,
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)

  expect(
    hasErrorStatus({
      eventId: 2,
      sessionId: 'session-1',
      status: '404',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)
})

test('hasErrorStatus should return true when an error field is present', () => {
  expect(
    hasErrorStatus({
      error: 'failed',
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)

  expect(
    hasErrorStatus({
      errorMessage: 'failed',
      eventId: 2,
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)

  expect(
    hasErrorStatus({
      eventId: 3,
      exception: 'failed',
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)
})

test('hasErrorStatus should return true for tool-execution events with result.error', () => {
  expect(
    hasErrorStatus({
      eventId: 1,
      result: {
        error: {
          message: 'Invalid argument: uri must be an absolute URI.',
        },
      },
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'tool-execution',
    }),
  ).toBe(true)
})

test('hasErrorStatus should return false for non-error events', () => {
  expect(
    hasErrorStatus({
      eventId: 1,
      sessionId: 'session-1',
      status: 204,
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(false)
})

test('handleSashPointerDown and handleSashPointerUp should return the same state object', () => {
  const state = createDefaultState()

  expect(handleSashPointerDown(state, 10, 20)).toBe(state)
  expect(handleSashPointerUp(state, 10, 20)).toBe(state)
})
