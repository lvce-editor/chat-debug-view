import { expect, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { matchesEventCategoryFilter } from '../src/parts/MatchesEventCategoryFilter/MatchesEventCategoryFilter.ts'

const getCategoryFilters = (selectedEventCategoryFilters: readonly string[]) => {
  return EventCategoryFilter.getSelectedCategoryFilters(EventCategoryFilter.createCategoryFilters(selectedEventCategoryFilters))
}

test('matchesEventCategoryFilter should always match when no filters are selected', () => {
  const event: ChatViewEvent = {
    eventId: 1,
    subType: '',
    type: 'request',
  }

  expect(matchesEventCategoryFilter(event, [])).toBe(true)
  expect(matchesEventCategoryFilter(event, getCategoryFilters([EventCategoryFilter.All]))).toBe(true)
})

test('matchesEventCategoryFilter should match each supported category and ignore unknown filters', () => {
  expect(matchesEventCategoryFilter({ eventId: 1, subType: '', type: 'request' }, getCategoryFilters([EventCategoryFilter.Network]))).toBe(true)
  expect(
    matchesEventCategoryFilter({ eventId: 3, subType: '', type: 'tool-execution-started' }, getCategoryFilters([EventCategoryFilter.Tools])),
  ).toBe(true)
  expect(
    matchesEventCategoryFilter({ eventId: 7, subType: '', type: 'tool-request-response' }, getCategoryFilters([EventCategoryFilter.Tools])),
  ).toBe(true)
  expect(matchesEventCategoryFilter({ eventId: 5, subType: '', type: 'handle-response' }, getCategoryFilters([EventCategoryFilter.Network]))).toBe(
    true,
  )
  expect(
    matchesEventCategoryFilter({ eventId: 6, subType: '', type: 'response' }, [
      { eventTypes: ['custom'], isSelected: true, label: 'Custom', name: 'custom' },
    ]),
  ).toBe(false)
})

test('matchesEventCategoryFilter should use eventTypes from the selected category filters', () => {
  const customCategoryFilters = [{ eventTypes: ['request'], isSelected: true, label: 'Requests', name: 'requests' }]

  expect(matchesEventCategoryFilter({ eventId: 1, subType: '', type: 'request' }, customCategoryFilters)).toBe(true)
  expect(matchesEventCategoryFilter({ eventId: 2, subType: '', type: 'response' }, customCategoryFilters)).toBe(false)
})
