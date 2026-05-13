import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'
import * as GetResizedTableColumnWidths from '../src/parts/TableColumnLayout/GetResizedTableColumnWidths.ts'

const createState = (): ReturnType<typeof CreateDefaultState.createDefaultState> => ({
  ...CreateDefaultState.createDefaultState(),
  tableWidth: 480,
  width: 1000,
  x: 10,
})

test('getResizedTableColumnWidths should return existing widths for an invalid resizer id', () => {
  const { tableColumns } = CreateDefaultState.createDefaultState()

  const result = GetResizedTableColumnWidths.getResizedTableColumnWidths(createState(), ['type', 'duration', 'status'], tableColumns, 318, 0)

  expect(result).toBe(tableColumns)
})

test('getResizedTableColumnWidths should resize the preceding visible column', () => {
  const result = GetResizedTableColumnWidths.getResizedTableColumnWidths(
    createState(),
    ['status', 'type', 'duration'],
    CreateDefaultState.createDefaultState().tableColumns,
    318,
    1,
  )

  expect(TableColumn.getTableColumnWidths(result)).toEqual({
    duration: 110,
    method: 90,
    size: 100,
    status: 110,
    type: 300,
  })
})

test('getResizedTableColumnWidths should clamp resized widths to the minimum width', () => {
  const result = GetResizedTableColumnWidths.getResizedTableColumnWidths(
    createState(),
    ['type', 'duration', 'status'],
    CreateDefaultState.createDefaultState().tableColumns,
    20,
    1,
  )

  expect(TableColumn.getTableColumnWidths(result)).toEqual({
    duration: 110,
    method: 90,
    size: 100,
    status: 110,
    type: 80,
  })
})

test('getResizedTableColumnWidths should allow shrinking the status column below the shared column minimum', () => {
  const result = GetResizedTableColumnWidths.getResizedTableColumnWidths(
    createState(),
    ['type', 'duration', 'status'],
    CreateDefaultState.createDefaultState().tableColumns,
    424,
    2,
  )

  expect(TableColumn.getTableColumnWidths(result)).toEqual({
    duration: 110,
    method: 90,
    size: 100,
    status: 140,
    type: 260,
  })
})
