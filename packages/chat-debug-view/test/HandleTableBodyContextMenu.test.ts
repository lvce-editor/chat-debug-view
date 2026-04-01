import { expect, test } from '@jest/globals'
import * as HandleTableBodyContextMenu from '../src/parts/HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTableBodyContextMenu should not change state', () => {
  const state = createDefaultState()
  const result = HandleTableBodyContextMenu.handleTableBodyContextMenu(state)

  expect(result).toBe(state)
})
