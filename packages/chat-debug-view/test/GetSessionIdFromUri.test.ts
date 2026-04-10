import { expect, test } from '@jest/globals'
import { getSessionIdFromUri } from '../src/parts/LoadEvents/GetSessionIdFromUri/GetSessionIdFromUri.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getSessionIdFromUri should return the parsed session id for a valid chat debug uri', () => {
  const state = {
    ...createDefaultState(),
    uri: 'chat-debug://session-1',
  }

  const result = getSessionIdFromUri(state)

  expect(result).toBe('session-1')
})

test('getSessionIdFromUri should return undefined for an invalid uri', () => {
  const state = {
    ...createDefaultState(),
    uri: 'invalid://session-1',
  }

  const result = getSessionIdFromUri(state)

  expect(result).toBeUndefined()
})
