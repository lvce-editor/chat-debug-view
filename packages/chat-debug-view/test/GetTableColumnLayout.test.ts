import { expect, test } from '@jest/globals'
import * as GetTableColumnLayout from '../src/parts/TableColumnLayout/GetTableColumnLayout.ts'

test('getTableColumnLayout should return empty layout when no columns are visible', () => {
  const result = GetTableColumnLayout.getTableColumnLayout(480, [], {
    duration: 110,
    status: 110,
    type: 260,
  })

  expect(result).toEqual({
    fixedColumns: [],
    resizerLefts: [],
    visibleColumns: [],
    visibleColumnWidths: [],
  })
})

test('getTableColumnLayout should order visible columns and clamp widths for remaining space', () => {
  const result = GetTableColumnLayout.getTableColumnLayout(360, ['status', 'type', 'duration'], {
    duration: 110,
    status: 110,
    type: 260,
  })

  expect(result).toEqual({
    fixedColumns: ['type', 'duration'],
    resizerLefts: [200, 280],
    visibleColumns: ['type', 'duration', 'status'],
    visibleColumnWidths: [200, 80, 80],
  })
})

test('getTableColumnLayout should give a single visible column the full table width', () => {
  const result = GetTableColumnLayout.getTableColumnLayout(240, ['status'], {
    duration: 110,
    status: 110,
    type: 260,
  })

  expect(result).toEqual({
    fixedColumns: [],
    resizerLefts: [],
    visibleColumns: ['status'],
    visibleColumnWidths: [240],
  })
})
