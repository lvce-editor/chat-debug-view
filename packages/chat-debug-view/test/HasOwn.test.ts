import { expect, test } from '@jest/globals'
import * as HasOwn from '../src/parts/HasOwn/HasOwn.ts'

test('hasOwn should return true when the event contains the property', () => {
  const result = HasOwn.hasOwn(
    {
      arguments: '{}',
      eventId: 1,
      type: 'request',
    },
    'arguments',
  )

  expect(result).toBe(true)
})

test('hasOwn should return false when the event does not contain the property', () => {
  const result = HasOwn.hasOwn(
    {
      eventId: 1,
      type: 'request',
    },
    'arguments',
  )

  expect(result).toBe(false)
})
