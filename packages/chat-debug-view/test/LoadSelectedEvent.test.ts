import { afterEach, expect, jest, test } from '@jest/globals'
import { loadSelectedEvent, loadSelectedEventDependencies } from '../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts'

const loadSelectedEventFromWorkerSpy = jest.spyOn(loadSelectedEventDependencies, 'loadSelectedEventFromWorker')

afterEach(() => {
  loadSelectedEventFromWorkerSpy.mockReset()
})

test('loadSelectedEvent should use chat storage worker', async () => {
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    type: 'request',
  }
  loadSelectedEventFromWorkerSpy.mockResolvedValue(event)

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toEqual(event)
  expect(loadSelectedEventFromWorkerSpy).toHaveBeenCalledWith('session-1', 1, 'request')
})

test('loadSelectedEvent should return the selected event details from the worker', async () => {
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    type: 'request',
  }
  loadSelectedEventFromWorkerSpy.mockResolvedValue(event)

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toEqual(event)
  expect(loadSelectedEventFromWorkerSpy).toHaveBeenCalledWith('session-1', 1, 'request')
})

test('loadSelectedEvent should return null when the worker has no details', async () => {
  loadSelectedEventFromWorkerSpy.mockResolvedValue(null)

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toBeNull()
  expect(loadSelectedEventFromWorkerSpy).toHaveBeenCalledWith('session-1', 1, 'request')
})
