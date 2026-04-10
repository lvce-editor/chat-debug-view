import { expect, test } from '@jest/globals'
import * as ParseSelectedEventIndex from '../src/parts/ParseSelectedEventIndex/ParseSelectedEventIndex.ts'

test('parseSelectedEventIndex should return the parsed index for valid values', () => {
  expect(ParseSelectedEventIndex.parseSelectedEventIndex('2')).toBe(2)
})

test('parseSelectedEventIndex should return null for empty values', () => {
  expect(ParseSelectedEventIndex.parseSelectedEventIndex('')).toBeNull()
})

test('parseSelectedEventIndex should return null for negative values', () => {
  expect(ParseSelectedEventIndex.parseSelectedEventIndex('-1')).toBeNull()
})

test('parseSelectedEventIndex should return null for non-numeric values', () => {
  expect(ParseSelectedEventIndex.parseSelectedEventIndex('abc')).toBeNull()
})
