import { afterEach, expect, jest, test } from '@jest/globals'

const mockOpenDb = jest.fn()

jest.unstable_mockModule('idb', () => {
  return {
    openDB: mockOpenDb,
  }
})

afterEach(() => {
  mockOpenDb.mockReset()
  jest.resetModules()
})

test('openDatabase should delegate to idb openDB', async () => {
  const database = {
    close: jest.fn(),
  }
  mockOpenDb.mockResolvedValue(database)
  const OpenDatabase = await import('../src/parts/OpenDatabase/OpenDatabase.ts')

  const result = await OpenDatabase.openDatabase('chat-db', 2)

  expect(result).toBe(database)
  expect(mockOpenDb).toHaveBeenCalledWith('chat-db', 2)
})
