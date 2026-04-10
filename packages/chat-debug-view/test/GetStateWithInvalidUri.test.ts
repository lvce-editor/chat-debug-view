import { expect, test } from '@jest/globals'
import { getInvalidUriMessage } from '../src/parts/GetInvalidUriMessage/GetInvalidUriMessage.ts'
import { getStateWithInvalidUri } from '../src/parts/LoadEvents/GetStateWithInvalidUri/GetStateWithInvalidUri.ts'
import { ParseChatDebugUriErrorCode } from '../src/parts/ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getStateWithInvalidUri should clear event state and set an error for invalid uris', () => {
  const state = {
    ...createDefaultState(),
    events: [{ eventId: 1, type: 'request' }],
    initial: true,
    selectedEvent: { eventId: 1, type: 'request' },
    selectedEventId: 1,
    selectedEventIndex: 0,
    sessionId: 'session-1',
    uri: 'invalid://session-1',
  }

  const result = getStateWithInvalidUri(state)

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
})

test('getStateWithInvalidUri should return the same state for valid uris', () => {
  const state = {
    ...createDefaultState(),
    uri: 'chat-debug://session-1',
  }

  const result = getStateWithInvalidUri(state)

  expect(result).toBe(state)
})
