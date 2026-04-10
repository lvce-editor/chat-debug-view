import { expect, test } from '@jest/globals'
import { getEmptyMessage } from '../src/parts/GetEmptyMessage/GetEmptyMessage.ts'

test('getEmptyMessage should return dedicated tools empty message when tools filter is active without other filters', () => {
  const result = getEmptyMessage(0, true, true, 'No events found matching tools')

  expect(result).toBe('No tool call events.')
})

test('getEmptyMessage should return filtered empty message when filters are active', () => {
  const result = getEmptyMessage(0, true, false, 'No events found matching network request')

  expect(result).toBe('No events found matching network request')
})

test('getEmptyMessage should return default empty message when no filters are active', () => {
  const result = getEmptyMessage(0, false, false, 'No events found matching anything')

  expect(result).toBe('No events have been found')
})
