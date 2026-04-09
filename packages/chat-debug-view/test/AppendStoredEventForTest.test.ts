import { afterEach, expect, jest, test } from '@jest/globals'
import * as AppendStoredEventForTest from '../src/parts/AppendStoredEventForTest/AppendStoredEventForTest.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('appendStoredEventForTest should append the event through the chat storage worker client', async () => {
  const state = createDefaultState()
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const appendEventSpy = jest.spyOn(AppendStoredEventForTest.appendStoredEventForTestDependencies, 'appendEvent').mockResolvedValue()

  const result = await AppendStoredEventForTest.appendStoredEventForTest(state, event)

  expect(result).toBe(state)
  expect(appendEventSpy).toHaveBeenCalledTimes(1)
  expect(appendEventSpy).toHaveBeenCalledWith(event)
})
