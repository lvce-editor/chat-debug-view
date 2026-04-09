import { expect, test } from '@jest/globals'
import * as HandleDetailsTopContextMenu from '../src/parts/HandleDetailsTopContextMenu/HandleDetailsTopContextMenu.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleDetailsTopContextMenu should not change state', () => {
  const state = createDefaultState()
  const result = HandleDetailsTopContextMenu.handleDetailsTopContextMenu(state)

  expect(result).toBe(state)
})
