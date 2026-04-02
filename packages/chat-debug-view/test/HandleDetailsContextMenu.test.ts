import { expect, test } from '@jest/globals'
import * as HandleDetailsContextMenu from '../src/parts/HandleDetailsContextMenu/HandleDetailsContextMenu.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleDetailsContextMenu should not change state', () => {
  const state = createDefaultState()
  const result = HandleDetailsContextMenu.handleDetailsContextMenu(state)

  expect(result).toBe(state)
})