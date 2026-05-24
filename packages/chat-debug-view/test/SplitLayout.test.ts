import { expect, test } from '@jest/globals'
import { getBalancedSplitTableWidth, shouldUseBalancedSplitTableWidth } from '../src/parts/SplitLayout/SplitLayout.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('shouldUseBalancedSplitTableWidth should be true on narrow screens with details visible', () => {
  const state = {
    ...createDefaultState(),
    selectedEvent: {
      eventId: 1,
      sessionId: 'session-1',
      subType: 'request',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    useDevtoolsLayout: true,
    width: 580,
  }

  const result = shouldUseBalancedSplitTableWidth(state)

  expect(result).toBe(true)
})

test('shouldUseBalancedSplitTableWidth should be false after a manual sash resize', () => {
  const state = {
    ...createDefaultState(),
    selectedEvent: {
      eventId: 1,
      sessionId: 'session-1',
      subType: 'request',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    tableWidthManuallyResized: true,
    useDevtoolsLayout: true,
    width: 580,
  }

  const result = shouldUseBalancedSplitTableWidth(state)

  expect(result).toBe(false)
})

test('getBalancedSplitTableWidth should return an even split width clamped to pane constraints', () => {
  const state = {
    ...createDefaultState(),
    width: 580,
  }

  const result = getBalancedSplitTableWidth(state)

  expect(result).toBe(280)
})
