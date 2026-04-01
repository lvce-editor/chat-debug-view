import { expect, test } from '@jest/globals'
import * as HandleSashPointerMove from '../src/parts/HandleSashPointerMove/HandleSashPointerMove.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleSashPointerMove should clamp tableWidth based on current view width', () => {
  const state = {
    ...createDefaultState(),
    width: 900,
    x: 100,
  }

  const result = HandleSashPointerMove.handleSashPointerMove(state, 628, 0)

  expect(result.tableWidth).toBe(520)
})

test('handleSashPointerMove should clamp tableWidth to keep room for details', () => {
  const state = {
    ...createDefaultState(),
    width: 900,
    x: 100,
  }

  const result = HandleSashPointerMove.handleSashPointerMove(state, 980, 0)

  expect(result.tableWidth).toBe(596)
})
