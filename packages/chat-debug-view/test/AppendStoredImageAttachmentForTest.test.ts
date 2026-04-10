import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import * as AppendStoredImageAttachmentForTest from '../src/parts/AppendStoredImageAttachmentForTest/AppendStoredImageAttachmentForTest.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('appendStoredImageAttachmentForTest should append a blob-backed attachment event through the chat storage worker client', async () => {
  const state = createDefaultState()
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.appendEvent': () => undefined,
  })

  const result = await AppendStoredImageAttachmentForTest.appendStoredImageAttachmentForTest(
    state,
    'session-1',
    7,
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
  expect(event.attachmentId).toBe('attachment-7')
  expect(event.eventId).toBe(7)
  expect(event.mimeType).toBe('image/svg+xml')
  expect(event.name).toBe('diagram.svg')
  expect(event.sessionId).toBe('session-1')
  expect(event.timestamp).toBe('2026-04-10T11:35:00.000Z')
  expect(event.type).toBe('chat-attachment-added')
  expect(event.blob).toBeInstanceOf(Blob)
  await expect(event.blob.text()).resolves.toBe('<svg xmlns="http://www.w3.org/2000/svg"></svg>')
})
