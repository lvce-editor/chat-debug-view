import { expect, test } from '@jest/globals'
import { roundSeconds } from '../src/parts/RoundSeconds/RoundSeconds.ts'

test('roundSeconds should round to three decimal places', () => {
  const result = roundSeconds(1.23456)

  expect(result).toBe(1.235)
})