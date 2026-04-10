import { expect, test } from '@jest/globals'
import { isSameVisibleTableColumns } from '../src/parts/IsSameVisibleTableColumns/IsSameVisibleTableColumns.ts'

test('isSameVisibleTableColumns should return true for matching columns in the same order', () => {
  const result = isSameVisibleTableColumns(['type', 'duration', 'status'], ['type', 'duration', 'status'])

  expect(result).toBe(true)
})

test('isSameVisibleTableColumns should return false when the order differs', () => {
  const result = isSameVisibleTableColumns(['type', 'status'], ['status', 'type'])

  expect(result).toBe(false)
})

test('isSameVisibleTableColumns should return false when the lengths differ', () => {
  const result = isSameVisibleTableColumns(['type', 'status'], ['type'])

  expect(result).toBe(false)
})
