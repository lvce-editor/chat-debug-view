import { expect, test } from '@jest/globals'
import { getStatusCodeValue } from '../src/parts/GetStatusCodeValue/GetStatusCodeValue.ts'

test('getStatusCodeValue should return undefined for null event', () => {
  expect(getStatusCodeValue(null)).toBeUndefined()
})

test('getStatusCodeValue should prioritize endValue.statusCode', () => {
  const event = {
    endValue: {
      statusCode: 201,
    },
    eventId: 1,
    statusCode: 200,
    type: 'ai-request',
  } as const
  expect(getStatusCodeValue(event)).toBe(201)
})

test('getStatusCodeValue should use selectedEvent.statusCode when endValue is unavailable', () => {
  const event = {
    eventId: 1,
    statusCode: 204,
    type: 'ai-request',
  } as const
  expect(getStatusCodeValue(event)).toBe(204)
})

test('getStatusCodeValue should fall back to status text for ai events', () => {
  const event = {
    eventId: 1,
    type: 'ai-response',
  } as const
  expect(getStatusCodeValue(event)).toBe('success')
})
