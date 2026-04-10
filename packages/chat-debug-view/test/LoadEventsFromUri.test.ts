import { afterEach, expect, jest, test } from '@jest/globals'
import { getInvalidUriMessage } from '../src/parts/GetInvalidUriMessage/GetInvalidUriMessage.ts'
import { loadEventsDependencies } from '../src/parts/LoadEvents/LoadEvents.ts'
import { loadEventsFromUri } from '../src/parts/LoadEvents/LoadEventsFromUri/LoadEventsFromUri.ts'
import { ParseChatDebugUriErrorCode } from '../src/parts/ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('loadEventsFromUri should return invalid-uri state when the uri cannot be parsed', async () => {
  const listChatViewEventsSpy = jest.spyOn(loadEventsDependencies, 'listChatViewEvents')
  const state = {
    ...createDefaultState(),
    initial: true,
    uri: 'invalid://session-1',
  }

  const result = await loadEventsFromUri(state)

  expect(result).toEqual({
    ...state,
    errorMessage: getInvalidUriMessage('invalid://session-1', ParseChatDebugUriErrorCode.InvalidUriFormat),
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId: '',
  })
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(0)
})
