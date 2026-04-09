import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as HandleHeaderContextMenu from '../src/parts/HandleHeaderContextMenu/HandleHeaderContextMenu.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleHeaderContextMenu should open context menu and not change state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })
  const state = createDefaultState()
  const result = await HandleHeaderContextMenu.handleHeaderContextMenu(state, 10, 20)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      HandleHeaderContextMenu.MenuChatDebugTableHeader,
      10,
      20,
      {
        menuId: HandleHeaderContextMenu.MenuChatDebugTableHeader,
      },
    ],
  ])
})
