import { afterEach, expect, jest, test } from '@jest/globals'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { loadEventsDependencies } from '../src/parts/LoadEvents/LoadEvents.ts'
import { refreshEvents } from '../src/parts/LoadEvents/RefreshEvents/RefreshEvents.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('refreshEvents should prefer the current state session id over the uri session id', async () => {
  const events = [{ eventId: 1, type: 'request' }]
  const listChatViewEventsSpy = jest.spyOn(loadEventsDependencies, 'listChatViewEvents').mockResolvedValue({
    events,
    type: 'success',
  })
  const state = {
    ...createDefaultState(),
    sessionId: 'session-from-state',
    uri: 'chat-debug://session-from-uri',
  }

  const result = await refreshEvents(state)

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      errorMessage: '',
      events,
      initial: false,
      sessionId: 'session-from-state',
    }),
  )
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
  expect(listChatViewEventsSpy).toHaveBeenCalledWith('session-from-state', 'lvce-chat-view-sessions', 2, 'chat-view-events', 'sessionId')
})
