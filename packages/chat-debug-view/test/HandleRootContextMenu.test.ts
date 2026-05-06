import { expect, test } from '@jest/globals'
import * as HandleRootContextMenu from '../src/parts/HandleRootContextMenu/HandleRootContextMenu.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleRootContextMenu should not change state', () => {
  const state = createDefaultState()
  const result = HandleRootContextMenu.handleRootContextMenu(state)

  expect(result).toBe(state)
})
