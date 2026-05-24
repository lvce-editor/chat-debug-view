import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ChatDebugViewState } from '../src/parts/State/ChatDebugViewState.ts'
import { handleTableRowDoubleClick } from '../src/parts/HandleTableRowDoubleClick/HandleTableRowDoubleClick.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import { applyVirtualTableState } from '../src/parts/VirtualTable/VirtualTable.ts'

const tableClientX = 30
const row0ClientY = 180
const row2ClientY = 221

const createClickableState = (overrides: Partial<ChatDebugViewState> = {}): ChatDebugViewState => {
  return applyVirtualTableState({
    ...createDefaultState(),
    height: 600,
    tableWidth: 480,
    width: 900,
    x: 10,
    y: 20,
    ...overrides,
  })
}

test('handleTableRowDoubleClick should open response json data for endValue responses', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => {},
  })
  const state = createClickableState({
    events: [
      {
        endValue: {
          value: {
            id: 'resp_1',
            status: 'ok',
          },
        },
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        subType: 'ai-request',
        type: 'ai-request',
      },
      {
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        subType: 'request',
        type: 'request',
      },
    ],
    sessionId: 'session-1',
  })

  const result = await handleTableRowDoubleClick(state, tableClientX, row0ClientY)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'Main.openUri',
      `data:application/json,${encodeURIComponent(
        JSON.stringify(
          {
            id: 'resp_1',
            status: 'ok',
          },
          null,
          2,
        ),
      )}`,
    ],
  ])
})

test('handleTableRowDoubleClick should open merged responseEvent json data', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => {},
  })
  const state = createClickableState({
    events: [
      {
        eventId: 1,
        responseEvent: {
          eventId: 2,
          subType: 'ai-response-success',
          type: 'ai-response-success',
          value: {
            id: 'resp_2',
          },
        },
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        subType: 'ai-request',
        type: 'ai-request',
      },
      {
        eventId: 3,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        subType: 'response',
        type: 'response',
      },
    ],
    sessionId: 'session-1',
  })

  const result = await handleTableRowDoubleClick(state, tableClientX, row0ClientY)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'Main.openUri',
      `data:application/json,${encodeURIComponent(
        JSON.stringify(
          {
            id: 'resp_2',
          },
          null,
          2,
        ),
      )}`,
    ],
  ])
})

test('handleTableRowDoubleClick should ignore clicks outside the table body', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => {},
  })
  const state = createClickableState({
    events: [
      {
        endValue: {
          value: {
            ok: true,
          },
        },
        eventId: 1,
        subType: 'ai-request',
        type: 'ai-request',
      },
    ],
  })

  const result = await handleTableRowDoubleClick(state, tableClientX, 171)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleTableRowDoubleClick should ignore rows without response data', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => {},
  })
  const state = createClickableState({
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        subType: 'request',
        type: 'request',
      },
      {
        endValue: {
          value: {
            ok: true,
          },
        },
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        subType: 'ai-request',
        type: 'ai-request',
      },
    ],
    sessionId: 'session-1',
  })

  const result = await handleTableRowDoubleClick(state, tableClientX, row0ClientY)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleTableRowDoubleClick should ignore out-of-range rows', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => {},
  })
  const state = createClickableState({
    events: [
      {
        endValue: {
          value: {
            ok: true,
          },
        },
        eventId: 1,
        subType: 'ai-request',
        type: 'ai-request',
      },
    ],
  })

  const result = await handleTableRowDoubleClick(state, tableClientX, row2ClientY)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
