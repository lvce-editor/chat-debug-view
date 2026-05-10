import { expect, test } from '@jest/globals'
import { clamp } from '../src/parts/Clamp/Clamp.ts'

test('clamp should keep values inside the given bounds', () => {
  expect(clamp(5, 0, 10)).toBe(5)
  expect(clamp(-1, 0, 10)).toBe(0)
  expect(clamp(12, 0, 10)).toBe(10)
})
