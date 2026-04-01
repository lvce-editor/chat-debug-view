import { afterEach, expect, jest, test } from '@jest/globals'
import * as ListChatViewEvents from '../src/parts/ListChatViewEvents/ListChatViewEvents.ts'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getIndexedDbNotSupportedMessage } from '../src/parts/GetIndexedDbNotSupportedMessage/GetIndexedDbNotSupportedMessage.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as LoadContent from '../src/parts/LoadContent/LoadContent.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('loadContent should return failed-to-load state when listing events returns an error', async () => {
  const error = new Error('failed to load events')
  const listChatViewEventsSpy = jest.spyOn(ListChatViewEvents, 'listChatViewEvents').mockResolvedValue({
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
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
})

test('loadContent should return indexeddb-not-supported state when IndexedDB is unavailable', async () => {
  const listChatViewEventsSpy = jest.spyOn(ListChatViewEvents, 'listChatViewEvents').mockResolvedValue({
    type: 'not-supported',
  })
  const state = {
    ...createDefaultState(),
    initial: true,
    uri: 'chat-debug://session-1',
  }

  const result = await LoadContent.loadContent(state)

  expect(result).toEqual({
    ...state,
    errorMessage: getIndexedDbNotSupportedMessage(),
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventIndex: null,
    sessionId: 'session-1',
  })
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
})
