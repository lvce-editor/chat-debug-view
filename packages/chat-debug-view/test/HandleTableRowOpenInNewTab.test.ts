import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { handleTableRowOpenInNewTab } from '../src/parts/HandleTableRowOpenInNewTab/HandleTableRowOpenInNewTab.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTableRowOpenInNewTab should open the clicked event as json data uri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => {},
  })
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        subType: 'request',
        type: 'request',
      },
      {
        error: 'tool call failed',
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:02.000Z',
        toolName: 'apply_patch',
        subType: 'tool-execution-finished',
        type: 'tool-execution-finished',
      },
    ],
    sessionId: 'session-1',
  }

  const result = await handleTableRowOpenInNewTab(state, 1)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'Main.openUri',
      `data:application/json,${encodeURIComponent(
        JSON.stringify(
          {
            error: 'tool call failed',
            eventId: 2,
            sessionId: 'session-1',
            timestamp: '2026-03-08T00:00:02.000Z',
            toolName: 'apply_patch',
            subType: 'tool-execution-finished',
            type: 'tool-execution-finished',
          },
          null,
          2,
        ),
      )}`,
    ],
  ])
})

test('handleTableRowOpenInNewTab should ignore invalid row indices', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => {},
  })
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        subType: 'request',
        type: 'request',
      },
    ],
    sessionId: 'session-1',
  }

  const result = await handleTableRowOpenInNewTab(state, 5)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
