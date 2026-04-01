import { expect, test } from '@jest/globals'
import { getEventsClassName } from '../src/parts/GetEventsClassName/GetEventsClassName.ts'

test('getEventsClassName should include full width class when no event is selected', () => {
  const result = getEventsClassName(false, false)

  expect(result).toBe('ChatDebugViewEvents ChatDebugViewEventsFullWidth')
})

test('getEventsClassName should omit full width class when an event is selected', () => {
  const result = getEventsClassName(true, false)

  expect(result).toBe('ChatDebugViewEvents')
})

test('getEventsClassName should append timeline class when timeline is visible', () => {
  const result = getEventsClassName(false, true)

  expect(result).toBe('ChatDebugViewEvents ChatDebugViewEventsFullWidth ChatDebugViewEvents--timeline')
})
