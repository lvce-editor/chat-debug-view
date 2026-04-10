import { expect, test } from '@jest/globals'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import * as HandleTimelinePointerUp from '../src/parts/HandleTimelinePointerUp/HandleTimelinePointerUp.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelinePointerUp should commit the normalized drag range relative to the widget', () => {
  const state = getStateWithTimelineInfo({
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
        timestamp: '2026-03-08T00:00:10.000Z',
        type: 'response',
      },
    ],
    timelineSelectionActive: true,
    timelineSelectionAnchorSeconds: '8',
    timelineSelectionFocusSeconds: '8',
    width: 436,
    x: 82,
  })

  const result = HandleTimelinePointerUp.handleTimelinePointerUp(state, 98)

  expect(result.timelineStartSeconds).toBe('2')
  expect(result.timelineEndSeconds).toBe('8')
  expect(result.timelineSelectionActive).toBe(false)
  expect(result.timelineSelectionAnchorSeconds).toBe('')
  expect(result.timelineSelectionFocusSeconds).toBe('')
})

test('handleTimelinePointerUp should commit a resized left edge while keeping the right edge fixed', () => {
  const state = getStateWithTimelineInfo({
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
        timestamp: '2026-03-08T00:00:10.000Z',
        type: 'response',
      },
    ],
    timelineEndSeconds: '8',
    timelineSelectionActive: true,
    timelineSelectionAnchorSeconds: '8',
    timelineSelectionFocusSeconds: '2',
    timelineStartSeconds: '2',
    width: 436,
    x: 82,
  })

  const result = HandleTimelinePointerUp.handleTimelinePointerUp(state, 18)

  expect(result.timelineStartSeconds).toBe('0')
  expect(result.timelineEndSeconds).toBe('8')
  expect(result.timelineSelectionActive).toBe(false)
})
