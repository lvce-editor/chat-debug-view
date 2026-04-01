import { expect, test } from '@jest/globals'
import { getIndexedDbNotSupportedMessage } from '../src/parts/GetIndexedDbNotSupportedMessage/GetIndexedDbNotSupportedMessage.ts'

test('getIndexedDbNotSupportedMessage returns IndexedDB unsupported message', () => {
  const result = getIndexedDbNotSupportedMessage()
  expect(result).toBe('Unable to load chat debug session: IndexedDB is not supported in this environment.')
})
