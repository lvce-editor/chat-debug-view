import { expect, test } from '@jest/globals'
import * as HandleHeaderContextMenu from '../src/parts/HandleHeaderContextMenu/HandleHeaderContextMenu.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleHeaderContextMenu should not change state', () => {
  const state = createDefaultState()
  const result = HandleHeaderContextMenu.handleHeaderContextMenu(state)

  expect(result).toBe(state)
})