import { expect, test } from '@jest/globals'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'

test('getFailedToLoadMessage returns failed-to-load message with the underlying error text', () => {
  const result = getFailedToLoadMessage('session-1', new Error('failed to open IndexedDB'))

  expect(result).toBe('Failed to load chat debug session "session-1": failed to open IndexedDB')
})

test('getFailedToLoadMessage falls back to a generic message when no error text is available', () => {
  const result = getFailedToLoadMessage('session-1', { code: 'UnknownError' })

  expect(result).toBe('Failed to load chat debug session "session-1". Please try again.')
})
