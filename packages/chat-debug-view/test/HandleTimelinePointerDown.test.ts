import { expect, test } from '@jest/globals'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import * as HandleTimelinePointerDown from '../src/parts/HandleTimelinePointerDown/HandleTimelinePointerDown.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelinePointerDown should start a drag selection from the pointer position relative to the widget', () => {
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
    width: 436,
    x: 82,
  })

  const result = HandleTimelinePointerDown.handleTimelinePointerDown(state, 168)

  expect(result.timelineSelectionActive).toBe(true)
  expect(result.timelineSelectionAnchorSeconds).toBe('3.75')
  expect(result.timelineSelectionFocusSeconds).toBe('3.75')
})
