import { expect, test } from '@jest/globals'
import { getEventsClassName } from '../src/parts/GetEventsClassName/GetEventsClassName.ts'

test('getEventsClassName should include full width class when no event is selected', () => {
  const result = getEventsClassName(false)

  expect(result).toBe('ChatDebugViewEvents ChatDebugViewEventsFullWidth')
})

test('getEventsClassName should omit full width class when an event is selected', () => {
  const result = getEventsClassName(true)

  expect(result).toBe('ChatDebugViewEvents')
})

test('getEventsClassName should not depend on timeline state', () => {
  const result = getEventsClassName(false)

  expect(result).toBe('ChatDebugViewEvents ChatDebugViewEventsFullWidth')
})
