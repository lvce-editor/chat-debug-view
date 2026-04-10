import { expect, test } from '@jest/globals'
import * as IsSameTableColumnWidths from '../src/parts/TableColumnLayout/IsSameTableColumnWidths.ts'

test('isSameTableColumnWidths should return true for equal widths', () => {
  const result = IsSameTableColumnWidths.isSameTableColumnWidths(
    {
      duration: 110,
      status: 110,
      type: 260,
    },
    {
      duration: 110,
      status: 110,
      type: 260,
    },
  )

  expect(result).toBe(true)
})

test('isSameTableColumnWidths should return false for different widths', () => {
  const result = IsSameTableColumnWidths.isSameTableColumnWidths(
    {
      duration: 110,
      status: 110,
      type: 260,
    },
    {
      duration: 110,
      status: 120,
      type: 260,
    },
  )

  expect(result).toBe(false)
})
