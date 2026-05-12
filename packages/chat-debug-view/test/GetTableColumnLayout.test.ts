import { expect, test } from '@jest/globals'
import * as GetTableColumnLayout from '../src/parts/TableColumnLayout/GetTableColumnLayout.ts'

test('getTableColumnLayout should return empty layout when no columns are visible', () => {
  const result = GetTableColumnLayout.getTableColumnLayout(480, [], {
    duration: 110,
    method: 90,
    size: 100,
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
  const result = GetTableColumnLayout.getTableColumnLayout(360, ['status', 'type', 'method', 'size', 'duration'], {
    duration: 110,
    method: 90,
    size: 100,
    status: 110,
    type: 260,
  })

  expect(result).toEqual({
    fixedColumns: ['type', 'method', 'status', 'size'],
    resizerLefts: [88, 144, 200, 280],
    visibleColumns: ['type', 'method', 'status', 'size', 'duration'],
    visibleColumnWidths: [88, 56, 56, 80, 80],
  })
})

test('getTableColumnLayout should give a single visible column the full table width', () => {
  const result = GetTableColumnLayout.getTableColumnLayout(240, ['status'], {
    duration: 110,
    method: 90,
    size: 100,
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

test('getTableColumnLayout should allow the trailing status column to use a smaller minimum width', () => {
  const result = GetTableColumnLayout.getTableColumnLayout(360, ['type', 'duration', 'method', 'size', 'status'], {
    duration: 240,
    method: 90,
    size: 100,
    status: 110,
    type: 260,
  })

  expect(result).toEqual({
    fixedColumns: ['type', 'method', 'status', 'size'],
    resizerLefts: [88, 144, 200, 280],
    visibleColumns: ['type', 'method', 'status', 'size', 'duration'],
    visibleColumnWidths: [88, 56, 56, 80, 80],
  })
})
