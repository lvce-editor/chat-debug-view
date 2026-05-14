import { expect, test } from '@jest/globals'
import { getGeneralEntries } from '../src/parts/GetGeneralEntries/GetGeneralEntries.ts'

test('getGeneralEntries should return empty entries for null event', () => {
  expect(getGeneralEntries(null)).toEqual([])
})

test('getGeneralEntries should include url, method, and formatted status code', () => {
  const event = {
    endValue: {
      statusCode: 201,
    },
    eventId: 1,
    method: 'POST',
    type: 'ai-request',
    url: 'https://example.com/chat',
  } as const
  expect(getGeneralEntries(event)).toEqual([
    ['Request URL', 'https://example.com/chat'],
    ['Request Method', 'POST'],
    ['Status Code', '201 Created'],
  ])
})

test('getGeneralEntries should omit empty status text', () => {
  const event = {
    eventId: 1,
    type: 'other',
    url: '',
  } as const
  expect(getGeneralEntries(event)).toEqual([])
})
