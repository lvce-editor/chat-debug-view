import { expect, test } from '@jest/globals'
import * as GetResizedTableColumnWidths from '../src/parts/TableColumnLayout/GetResizedTableColumnWidths.ts'

test('getResizedTableColumnWidths should return existing widths for an invalid resizer id', () => {
  const tableColumnWidths = {
    duration: 110,
    status: 110,
    type: 260,
  }

  const result = GetResizedTableColumnWidths.getResizedTableColumnWidths(1000, 480, ['type', 'duration', 'status'], tableColumnWidths, 10, 318, 0)

  expect(result).toBe(tableColumnWidths)
})

test('getResizedTableColumnWidths should resize the preceding visible column', () => {
  const result = GetResizedTableColumnWidths.getResizedTableColumnWidths(
    1000,
    480,
    ['status', 'type', 'duration'],
    {
      duration: 110,
      status: 110,
      type: 260,
    },
    10,
    318,
    1,
  )

  expect(result).toEqual({
    duration: 110,
    status: 110,
    type: 300,
  })
})

test('getResizedTableColumnWidths should clamp resized widths to the minimum width', () => {
  const result = GetResizedTableColumnWidths.getResizedTableColumnWidths(
    1000,
    480,
    ['type', 'duration', 'status'],
    {
      duration: 110,
      status: 110,
      type: 260,
    },
    10,
    20,
    1,
  )

  expect(result).toEqual({
    duration: 110,
    status: 110,
    type: 80,
  })
})
