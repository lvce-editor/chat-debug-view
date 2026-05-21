import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { loadPreferences } from '../src/parts/LoadPreferences/LoadPreferences.ts'

test('loadPreferences should return chat debug preferences', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => 'true',
  })

  const result = await loadPreferences()

  expect(result).toEqual({
    autoRefresh: true,
  })
  expect(rendererRpc.invocations).toEqual([['Preferences.get', 'chatDebug.autoRefresh']])
})