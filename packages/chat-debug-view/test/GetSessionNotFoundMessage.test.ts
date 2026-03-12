import { expect, test } from '@jest/globals'
import { getSessionNotFoundMessage } from '../src/parts/GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts'

test('getSessionNotFoundMessage returns not-found message for session id', () => {
  const result = getSessionNotFoundMessage('session-1')
  expect(result).toBe('No chat session found for sessionId "session-1".')
})
