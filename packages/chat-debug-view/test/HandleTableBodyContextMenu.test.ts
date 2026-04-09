import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as HandleTableBodyContextMenu from '../src/parts/HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTableBodyContextMenu should open context menu and not change state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })
  const state = createDefaultState()
  const result = await HandleTableBodyContextMenu.handleTableBodyContextMenu(state, 10, 20)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      HandleTableBodyContextMenu.MenuChatDebugTableBody,
      10,
      20,
      {
        eventIndex: -1,
        menuId: HandleTableBodyContextMenu.MenuChatDebugTableBody,
      },
    ],
  ])
})
