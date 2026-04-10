import { expect, test } from '@jest/globals'
import * as HandleTableResizerPointerDown from '../src/parts/HandleTableResizerPointerDown/HandleTableResizerPointerDown.ts'
import * as HandleTableResizerPointerMove from '../src/parts/HandleTableResizerPointerMove/HandleTableResizerPointerMove.ts'
import * as HandleTableResizerPointerUp from '../src/parts/HandleTableResizerPointerUp/HandleTableResizerPointerUp.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTableResizerPointerMove should update the first visible column width', () => {
  const pointerDownState = HandleTableResizerPointerDown.handleTableResizerPointerDown(
    {
      ...createDefaultState(),
      tableWidth: 480,
      visibleTableColumns: ['type', 'duration', 'status'],
      width: 900,
      x: 100,
    },
    'ResizerOne',
    0,
  )

  const result = HandleTableResizerPointerMove.handleTableResizerPointerMove(pointerDownState, 340)

  expect(result.tableColumnWidths).toEqual({
    duration: 110,
    status: 110,
    type: 232,
  })
})

test('handleTableResizerPointerMove should clamp the active visible column width', () => {
  const pointerDownState = HandleTableResizerPointerDown.handleTableResizerPointerDown(
    {
      ...createDefaultState(),
      tableWidth: 480,
      visibleTableColumns: ['duration', 'status'],
      width: 900,
      x: 100,
    },
    'ResizerOne',
    0,
  )

  const result = HandleTableResizerPointerMove.handleTableResizerPointerMove(pointerDownState, 800)

  expect(result.tableColumnWidths.duration).toBe(400)
})

test('handleTableResizerPointerUp should clear the active resizer id', () => {
  const pointerDownState = HandleTableResizerPointerDown.handleTableResizerPointerDown(createDefaultState(), 'ResizerTwo', 0)

  const result = HandleTableResizerPointerUp.handleTableResizerPointerUp(pointerDownState)

  expect(result.tableResizerDownId).toBe(0)
})
