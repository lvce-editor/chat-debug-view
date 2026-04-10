import { expect, test } from '@jest/globals'
import * as ChatDebugStrings from '../src/parts/ChatDebugStrings/ChatDebugStrings.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { getLightweightEvent } from '../src/parts/GetLightweightEvent/GetLightweightEvent.ts'
import { getTimelineFilterDescription } from '../src/parts/GetTimelineFilterDescription/GetTimelineFilterDescription.ts'
import { handleSashPointerDown } from '../src/parts/HandleSashPointerDown/HandleSashPointerDown.ts'
import { handleSashPointerUp } from '../src/parts/HandleSashPointerUp/HandleSashPointerUp.ts'
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

test('chat debug empty-state strings should return localized messages', () => {
  expect(ChatDebugStrings.noEventsFound()).toBe('No events have been found')
  expect(ChatDebugStrings.noEventsFoundMatching('response')).toBe('No events found matching response')
  expect(ChatDebugStrings.noToolCallEvents()).toBe('No tool call events.')
  expect(ChatDebugStrings.network()).toBe('Network')
})

test('handleSashPointerDown and handleSashPointerUp should return the same state object', () => {
  const state = createDefaultState()
  const pointerDownState = handleSashPointerDown(state, 10, 20)

  expect(pointerDownState).toEqual({
    ...state,
    sashPointerActive: true,
  })
  expect(handleSashPointerUp(pointerDownState, 10, 20)).toEqual(state)
})
