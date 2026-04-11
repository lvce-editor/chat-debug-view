import { expect, test } from '@jest/globals'
import { getTimelineEventX } from '../src/parts/GetTimelineEventX/GetTimelineEventX.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getTimelineEventX should subtract the view x position from the pointer x position', () => {
  const state = {
    ...createDefaultState(),
    x: 40,
  }

  const result = getTimelineEventX(state, 140)

  expect(result).toBe(100)
})

test('getTimelineEventX should return a negative value when the pointer is left of the view', () => {
  const state = {
    ...createDefaultState(),
    x: 120,
  }

  const result = getTimelineEventX(state, 20)

  expect(result).toBe(-100)
})
