import { expect, test } from '@jest/globals'
import * as GetDuration from '../src/parts/GetDuration/GetDuration.ts'

test('getDuration should return explicit finite durationMs', () => {
  const result = GetDuration.getDuration({
    durationMs: 7,
    started: '2026-01-01T00:00:00.000Z',
    timestamp: '2026-01-01T00:00:00.000Z',
    type: 'request',
  })

  expect(result).toBe(7)
})

test('getDuration should calculate duration from derived start and end times', () => {
  const result = GetDuration.getDuration({
    ended: '2026-01-01T00:00:01.000Z',
    started: '2026-01-01T00:00:00.000Z',
    type: 'request',
  })

  expect(result).toBe(1000)
})

test('getDuration should return zero for invalid times', () => {
  const result = GetDuration.getDuration({
    endTime: 'not-a-date',
    startTime: '2026-01-01T00:00:00.000Z',
    type: 'request',
  })

  expect(result).toBe(0)
})
