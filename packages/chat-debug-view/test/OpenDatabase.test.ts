import { afterEach, expect, jest, test } from '@jest/globals'
import { openDatabase, openDatabaseDependencies } from '../src/parts/OpenDatabase/OpenDatabase.ts'

const openDbSpy = jest.spyOn(openDatabaseDependencies, 'openDB')

afterEach(() => {
  openDbSpy.mockReset()
})

test('openDatabase should delegate to idb openDB', async () => {
  const database = {
    close: jest.fn(),
  }
  openDbSpy.mockResolvedValue(database as never)

  const result = await openDatabase('chat-db', 2)

  expect(result).toBe(database)
  expect(openDbSpy).toHaveBeenCalledWith('chat-db', 2)
})
