import { expect, test } from '@jest/globals'
import { hasErrorStatus } from '../src/parts/HasErrorStatus/HasErrorStatus.ts'

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

test('hasErrorStatus should return true when status is the string error', () => {
  expect(
    hasErrorStatus({
      eventId: 1,
      sessionId: 'session-1',
      status: 'error',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'tool-execution',
    }),
  ).toBe(true)
})

test('hasErrorStatus should return true for top-level and nested status codes >= 400', () => {
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
      result: {
        status: '404',
      },
      sessionId: 'session-1',
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

test('hasErrorStatus should return true for string errors nested in result', () => {
  expect(
    hasErrorStatus({
      eventId: 1,
      result: {
        errorMessage: 'failed',
      },
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
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
