import { expect, test } from '@jest/globals'
import * as IsTableColumnWidths from '../src/parts/TableColumnLayout/IsTableColumnWidths.ts'

test('isTableColumnWidths should return true for finite table column widths', () => {
  const result = IsTableColumnWidths.isTableColumnWidths({
    duration: 110,
    status: 110,
    type: 260,
  })

  expect(result).toBe(true)
})

test('isTableColumnWidths should return false for non-objects', () => {
  expect(IsTableColumnWidths.isTableColumnWidths(null)).toBe(false)
  expect(IsTableColumnWidths.isTableColumnWidths(undefined)).toBe(false)
})

test('isTableColumnWidths should return false for missing or invalid widths', () => {
  expect(
    IsTableColumnWidths.isTableColumnWidths({
      duration: 110,
      status: 110,
    }),
  ).toBe(false)

  expect(
    IsTableColumnWidths.isTableColumnWidths({
      duration: 110,
      status: Number.POSITIVE_INFINITY,
      type: 260,
    }),
  ).toBe(false)
})
