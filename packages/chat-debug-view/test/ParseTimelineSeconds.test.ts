import { expect, test } from '@jest/globals'
import { parseTimelineSeconds } from '../src/parts/ParseTimelineSeconds/ParseTimelineSeconds.ts'

test('parseTimelineSeconds should trim valid numeric input', () => {
  const result = parseTimelineSeconds(' 1.25 ')

  expect(result).toBe(1.25)
})

test('parseTimelineSeconds should return undefined for empty and invalid values', () => {
  expect(parseTimelineSeconds('')).toBeUndefined()
  expect(parseTimelineSeconds('nope')).toBeUndefined()
  expect(parseTimelineSeconds('-1')).toBeUndefined()
})
