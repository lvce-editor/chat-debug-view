import { expect, test } from '@jest/globals'
import * as HandleTimelineContextMenu from '../src/parts/HandleTimelineContextMenu/HandleTimelineContextMenu.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelineContextMenu should not change state', () => {
  const state = createDefaultState()
  const result = HandleTimelineContextMenu.handleTimelineContextMenu(state)

  expect(result).toBe(state)
})
