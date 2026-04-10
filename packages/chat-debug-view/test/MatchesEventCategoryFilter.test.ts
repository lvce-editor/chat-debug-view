import { expect, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { matchesEventCategoryFilter } from '../src/parts/MatchesEventCategoryFilter/MatchesEventCategoryFilter.ts'

test('matchesEventCategoryFilter should always match when no filters are selected', () => {
  const event: ChatViewEvent = {
    eventId: 1,
    type: 'request',
  }

  expect(matchesEventCategoryFilter(event, [])).toBe(true)
  expect(matchesEventCategoryFilter(event, [EventCategoryFilter.All])).toBe(true)
})

test('matchesEventCategoryFilter should match each supported category and ignore unknown filters', () => {
  expect(matchesEventCategoryFilter({ eventId: 1, type: 'request' }, [EventCategoryFilter.Network])).toBe(true)
  expect(matchesEventCategoryFilter({ eventId: 2, type: 'sse-response-part' }, [EventCategoryFilter.Stream])).toBe(true)
  expect(matchesEventCategoryFilter({ eventId: 3, type: 'tool-execution-started' }, [EventCategoryFilter.Tools])).toBe(true)
  expect(matchesEventCategoryFilter({ eventId: 4, type: 'handle-click' }, [EventCategoryFilter.Ui])).toBe(true)
  expect(matchesEventCategoryFilter({ eventId: 5, type: 'handle-response' }, [EventCategoryFilter.Ui])).toBe(false)
  expect(matchesEventCategoryFilter({ eventId: 6, type: 'response' }, ['custom-filter'])).toBe(true)
})
