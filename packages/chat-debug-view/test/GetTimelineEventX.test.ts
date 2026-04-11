import { expect, test } from '@jest/globals'
import { getTimelineEventX } from '../src/parts/GetTimelineEventX/GetTimelineEventX.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getTimelineEventX should convert a view-relative pointer x position into a client x position', () => {
  const state = {
    ...createDefaultState(),
    x: 40,
  }

  const result = getTimelineEventX(state, 140)

  expect(result).toBe(180)
})

test('getTimelineEventX should preserve negative offsets relative to the view origin', () => {
  const state = {
    ...createDefaultState(),
    x: 120,
  }

  const result = getTimelineEventX(state, 20)

  expect(result).toBe(140)
})

test('getTimelineEventX should return a smaller client x position when the pointer is left of the view origin', () => {
  const state = {
    ...createDefaultState(),
    x: 120,
  }

  const result = getTimelineEventX(state, -20)

  expect(result).toBe(100)
})
