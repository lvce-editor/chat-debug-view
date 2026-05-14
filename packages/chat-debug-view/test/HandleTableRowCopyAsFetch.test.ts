import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { handleTableRowCopyAsFetch } from '../src/parts/HandleTableRowCopyAsFetch/HandleTableRowCopyAsFetch.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTableRowCopyAsFetch should write the clicked request event as fetch code to the clipboard', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {},
  })
  const state = {
    ...createDefaultState(),
    events: [
      {
        body: {
          input: 'hello',
        },
        eventId: 1,
        headers: {
          Authorization: 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'request',
        url: 'https://example.com/chat',
      },
    ],
    sessionId: 'session-1',
  }

  const result = await handleTableRowCopyAsFetch(state, 0)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ClipBoard.writeText',
      `fetch('https://example.com/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer test-token',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
    {
      "input": "hello"
    }
  ),
})`,
    ],
  ])
})

test('handleTableRowCopyAsFetch should ignore invalid row indices', async () => {
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

  const result = await handleTableRowCopyAsFetch(state, 5)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleTableRowCopyAsFetch should fall back to json when the event has no url', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {},
  })
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:02.000Z',
        toolName: 'apply_patch',
        type: 'tool-execution-finished',
      },
    ],
    sessionId: 'session-1',
  }

  const result = await handleTableRowCopyAsFetch(state, 0)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ClipBoard.writeText',
      JSON.stringify(
        {
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
