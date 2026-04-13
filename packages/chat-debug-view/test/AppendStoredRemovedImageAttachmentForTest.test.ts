import { afterEach, expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import * as AppendStoredRemovedImageAttachmentForTest from '../src/parts/AppendStoredRemovedImageAttachmentForTest/AppendStoredRemovedImageAttachmentForTest.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

const originalOffscreenCanvas = (globalThis as typeof globalThis & { OffscreenCanvas?: unknown }).OffscreenCanvas

const setOffscreenCanvas = (value: unknown): void => {
  Object.defineProperty(globalThis, 'OffscreenCanvas', {
    configurable: true,
    value,
    writable: true,
  })
}

afterEach(() => {
  setOffscreenCanvas(originalOffscreenCanvas)
})

test('appendStoredRemovedImageAttachmentForTest should append a blob-backed removed attachment event through the chat storage worker client', async () => {
  const state = createDefaultState()
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.appendEvent': () => undefined,
  })

  const result = await AppendStoredRemovedImageAttachmentForTest.appendStoredRemovedImageAttachmentForTest(
    state,
    'session-1',
    11,
    'image/svg+xml',
    'diagram.svg',
    'text',
    '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
    '2026-04-10T11:35:00.000Z',
  )

  expect(result).toBe(state)
  expect(mockRpc.invocations).toHaveLength(1)
  const [command, event] = mockRpc.invocations[0] as [
    string,
    {
      readonly attachmentId: string
      readonly blob: Blob
      readonly eventId: number
      readonly mimeType: string
      readonly name: string
      readonly sessionId: string
      readonly timestamp: string
      readonly type: string
    },
  ]
  expect(command).toBe('ChatStorage.appendEvent')
  expect(event.attachmentId).toBe('attachment-11')
  expect(event.eventId).toBe(11)
  expect(event.mimeType).toBe('image/svg+xml')
  expect(event.name).toBe('diagram.svg')
  expect(event.sessionId).toBe('session-1')
  expect(event.timestamp).toBe('2026-04-10T11:35:00.000Z')
  expect(event.type).toBe('chat-attachment-removed')
  expect(event.blob).toBeInstanceOf(Blob)
  await expect(event.blob.text()).resolves.toBe('<svg xmlns="http://www.w3.org/2000/svg"></svg>')
})