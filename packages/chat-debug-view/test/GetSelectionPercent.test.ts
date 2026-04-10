import { expect, test } from '@jest/globals'
import { getSelectionPercent } from '../src/parts/GetSelectionPercent/GetSelectionPercent.ts'

test('getSelectionPercent should return a rounded percentage', () => {
  const result = getSelectionPercent(2.3456, 10)

  expect(result).toBe(23.456)
})

test('getSelectionPercent should return zero for zero duration', () => {
  const result = getSelectionPercent(2, 0)

  expect(result).toBe(0)
})