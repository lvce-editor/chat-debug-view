import { afterEach, expect, jest, test } from '@jest/globals'
import { listChatViewEvents, listChatViewEventsDependencies } from '../src/parts/ListChatViewEvents/ListChatViewEvents.ts'

const listChatViewEventsFromWorkerSpy = jest.spyOn(listChatViewEventsDependencies, 'listChatViewEventsFromWorker')

afterEach(() => {
  listChatViewEventsFromWorkerSpy.mockReset()
})

test('listChatViewEvents should use chat storage worker', async () => {
  const events = [
    {
      duration: 0,
      endTime: '2026-03-08T00:00:00.000Z',
      eventId: 1,
      startTime: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  listChatViewEventsFromWorkerSpy.mockResolvedValue({
    events,
    type: 'success',
  })

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    events,
    type: 'success',
  })
  expect(listChatViewEventsFromWorkerSpy).toHaveBeenCalledWith('session-1')
})

test('listChatViewEvents should return error when chat storage worker loading fails', async () => {
  const error = new Error('worker failed')
  listChatViewEventsFromWorkerSpy.mockRejectedValue(error)

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    error,
    type: 'error',
  })
  expect(listChatViewEventsFromWorkerSpy).toHaveBeenCalledWith('session-1')
})
