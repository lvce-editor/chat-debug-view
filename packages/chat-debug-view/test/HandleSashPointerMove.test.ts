import { expect, test } from '@jest/globals'
import * as HandleSashPointerDown from '../src/parts/HandleSashPointerDown/HandleSashPointerDown.ts'
import * as HandleSashPointerMove from '../src/parts/HandleSashPointerMove/HandleSashPointerMove.ts'
import * as HandleSashPointerUp from '../src/parts/HandleSashPointerUp/HandleSashPointerUp.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleSashPointerMove should ignore pointer movement when the sash is not active', () => {
  const state = {
    ...createDefaultState(),
    tableWidth: 480,
    width: 900,
    x: 100,
  }

  const result = HandleSashPointerMove.handleSashPointerMove(state, 628, 0)

  expect(result).toBe(state)
})

test('handleSashPointerMove should clamp tableWidth based on current view width', () => {
  const state = HandleSashPointerDown.handleSashPointerDown(
    {
      ...createDefaultState(),
      width: 900,
      x: 100,
    },
    0,
    0,
  )

  const result = HandleSashPointerMove.handleSashPointerMove(state, 628, 0)

  expect(result.tableWidth).toBe(520)
})

test('handleSashPointerMove should clamp tableWidth to keep room for details', () => {
  const state = HandleSashPointerDown.handleSashPointerDown(
    {
      ...createDefaultState(),
      width: 900,
      x: 100,
    },
    0,
    0,
  )

  const result = HandleSashPointerMove.handleSashPointerMove(state, 980, 0)

  expect(result.tableWidth).toBe(596)
})

test('handleSashPointerUp should clear the active sash state', () => {
  const pointerDownState = HandleSashPointerDown.handleSashPointerDown(createDefaultState(), 0, 0)

  const result = HandleSashPointerUp.handleSashPointerUp(pointerDownState, 10, 20)

  expect(result.sashPointerActive).toBe(false)
})
