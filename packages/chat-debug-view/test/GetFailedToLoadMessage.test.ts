import { expect, test } from '@jest/globals'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'

test('getFailedToLoadMessage returns failed-to-load message for session id', () => {
  const result = getFailedToLoadMessage('session-1')
  expect(result).toBe('Failed to load chat debug session "session-1". Please try again.')
})
