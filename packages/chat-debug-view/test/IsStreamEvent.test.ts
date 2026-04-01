import { expect, test } from '@jest/globals'
import * as IsStreamEvent from '../src/parts/IsStreamEvent/IsStreamEvent.ts'

test('isStreamEvent should return true for sse response part events', () => {
  const result = IsStreamEvent.isStreamEvent({
    type: 'sse-response-part',
  })

  expect(result).toBe(true)
})

test('isStreamEvent should return true for event stream finished events', () => {
  const result = IsStreamEvent.isStreamEvent({
    type: 'event-stream-finished',
  })

  expect(result).toBe(true)
})

test('isStreamEvent should return false for non-stream events', () => {
  const result = IsStreamEvent.isStreamEvent({
    type: 'request',
  })

  expect(result).toBe(false)
})