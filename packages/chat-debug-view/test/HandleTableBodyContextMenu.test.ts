import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as HandleTableBodyContextMenu from '../src/parts/HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getTableBodyEventIndex should derive event index from coordinates', () => {
  const state = {
    ...createDefaultState(),
    events: [{ type: 'request' }, { type: 'response' }, { type: 'request' }],
    height: 600,
    tableWidth: 480,
    width: 900,
    x: 10,
    y: 20,
  }

  const result = HandleTableBodyContextMenu.getTableBodyEventIndex(state, 30, 197)

  expect(result).toBe(1)
})

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
