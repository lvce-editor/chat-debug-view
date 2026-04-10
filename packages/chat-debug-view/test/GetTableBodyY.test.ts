import { expect, test } from '@jest/globals'
import { getTableBodyY } from '../src/parts/GetTableBodyY/GetTableBodyY.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getTableBodyY should include timeline height when timeline is visible', () => {
  const state = {
    ...createDefaultState(),
    y: 20,
  }

  const result = getTableBodyY(state, true)

  expect(result).toBe(172)
})

test('getTableBodyY should omit timeline height when timeline is hidden', () => {
  const state = {
    ...createDefaultState(),
    y: 20,
  }

  const result = getTableBodyY(state, false)

  expect(result).toBe(84)
})
