import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { handleTableRowCopy } from '../src/parts/HandleTableRowCopy/HandleTableRowCopy.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTableRowCopy should write the clicked event as json to the clipboard', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {},
  })
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'request',
      },
      {
        error: 'tool call failed',
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:02.000Z',
        toolName: 'apply_patch',
        type: 'tool-execution-finished',
      },
    ],
    sessionId: 'session-1',
  }

  const result = await handleTableRowCopy(state, 1)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ClipBoard.writeText',
      JSON.stringify(
        {
          error: 'tool call failed',
          eventId: 2,
          sessionId: 'session-1',
          timestamp: '2026-03-08T00:00:02.000Z',
          toolName: 'apply_patch',
          type: 'tool-execution-finished',
        },
        null,
        2,
      ),
    ],
  ])
})

test('handleTableRowCopy should ignore invalid row indices', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {},
  })
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'request',
      },
    ],
    sessionId: 'session-1',
  }

  const result = await handleTableRowCopy(state, 5)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
