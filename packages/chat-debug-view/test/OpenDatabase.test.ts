import { afterEach, expect, jest, test } from '@jest/globals'
import * as Idb from 'idb'
import * as OpenDatabase from '../src/parts/OpenDatabase/OpenDatabase.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('openDatabase should delegate to idb openDB', async () => {
  const database = {
    close: jest.fn(),
  }
  const openDbSpy = jest.spyOn(Idb, 'openDB').mockResolvedValue(database as never)

  const result = await OpenDatabase.openDatabase('chat-db', 2)

  expect(result).toBe(database)
  expect(openDbSpy).toHaveBeenCalledWith('chat-db', 2)
})