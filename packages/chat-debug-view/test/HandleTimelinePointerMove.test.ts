import { expect, test } from '@jest/globals'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import * as HandleTimelinePointerMove from '../src/parts/HandleTimelinePointerMove/HandleTimelinePointerMove.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelinePointerMove should update the timeline hover guide when not dragging', () => {
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

  const result = HandleTimelinePointerMove.handleTimelinePointerMove(state, 338)
  const resultRecord = result as Record<string, unknown>

  expect(resultRecord['timelineHoverSeconds']).toBe('8')
  expect(result.timelineSelectionActive).toBe(false)
})

test('handleTimelinePointerMove should update the drag preview range relative to the widget', () => {
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
    timelineSelectionAnchorSeconds: '2.5',
    timelineSelectionFocusSeconds: '2.5',
    width: 436,
    x: 82,
  })

  const result = HandleTimelinePointerMove.handleTimelinePointerMove(state, 338)
  const resultRecord = result as Record<string, unknown>

  expect(result.timelineSelectionFocusSeconds).toBe('8')
  expect(resultRecord['timelineHoverSeconds']).toBe('8')
})
