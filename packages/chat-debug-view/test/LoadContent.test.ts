import { expect, jest, test } from '@jest/globals'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

const mockListChatViewEvents = jest.fn()

jest.unstable_mockModule('../src/parts/ListChatViewEvents/ListChatViewEvents.ts', () => {
  return {
    listChatViewEvents: mockListChatViewEvents,
  }
})

const LoadContent = await import('../src/parts/LoadContent/LoadContent.ts')

test('loadContent should return failed-to-load state when listing events returns an error', async () => {
  const error = new Error('failed to load events')
  mockListChatViewEvents.mockResolvedValue({
    error,
    type: 'error',
  })
  const state = {
    ...createDefaultState(),
    initial: true,
    uri: 'chat-debug://session-1',
  }

  const result = await LoadContent.loadContent(state)

  expect(result).toEqual({
    ...state,
    errorMessage: getFailedToLoadMessage('session-1'),
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventIndex: null,
    sessionId: 'session-1',
  })
})
