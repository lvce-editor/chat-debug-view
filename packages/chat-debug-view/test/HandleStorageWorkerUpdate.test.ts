import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as HandleStorageWorkerUpdate from '../src/parts/HandleStorageWorkerUpdate/HandleStorageWorkerUpdate.ts'

test('handleStorageWorkerUpdate should ask the renderer worker to refresh the viewlet', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.executeViewletCommand': () => undefined,
  })

  await HandleStorageWorkerUpdate.handleStorageWorkerUpdate(23)

  expect(mockRpc.invocations).toEqual([['Viewlet.executeViewletCommand', 23, 'ChatDebug.handleClickRefresh']])
})
