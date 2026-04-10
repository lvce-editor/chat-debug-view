import { expect, test } from '@jest/globals'
import { getNormalizedRange } from '../src/parts/GetNormalizedRange/GetNormalizedRange.ts'

test('getNormalizedRange should return no selection when both values are invalid', () => {
  const result = getNormalizedRange(10, '-1', 'nope')

  expect(result).toEqual({
    endSeconds: null,
    hasSelection: false,
    startSeconds: null,
  })
})

test('getNormalizedRange should swap and clamp reversed ranges', () => {
  const result = getNormalizedRange(10, '12', '3')

  expect(result).toEqual({
    endSeconds: 10,
    hasSelection: true,
    startSeconds: 3,
  })
})
