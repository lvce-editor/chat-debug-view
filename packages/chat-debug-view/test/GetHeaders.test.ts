import { expect, test } from '@jest/globals'
import { getHeaders } from '../src/parts/GetHeaders/GetHeaders.ts'

test('getHeaders should return entries for records', () => {
  expect(getHeaders({ a: 1, b: 2 })).toEqual([
    ['a', 1],
    ['b', 2],
  ])
})

test('getHeaders should return empty array for non-record values', () => {
  expect(getHeaders(null)).toEqual([])
  expect(getHeaders(undefined)).toEqual([])
  expect(getHeaders('x')).toEqual([])
  expect(getHeaders([])).toEqual([])
})
