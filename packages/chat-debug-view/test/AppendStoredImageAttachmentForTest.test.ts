import { afterEach, expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import * as AppendStoredImageAttachmentForTest from '../src/parts/AppendStoredImageAttachmentForTest/AppendStoredImageAttachmentForTest.ts'
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

test('appendStoredImageAttachmentForTest should decode base64 attachment content before appending', async () => {
  const state = createDefaultState()
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.appendEvent': () => undefined,
  })

  await AppendStoredImageAttachmentForTest.appendStoredImageAttachmentForTest(
    state,
    'session-1',
    8,
    'image/png',
    'icon.png',
    'base64',
    btoa('cat'),
    '2026-04-10T11:36:00.000Z',
  )

  expect(mockRpc.invocations).toHaveLength(1)
  const [command, event] = mockRpc.invocations[0] as [
    string,
    {
      readonly blob: Blob
    },
  ]
  expect(command).toBe('ChatStorage.appendEvent')
  expect([...new Uint8Array(await event.blob.arrayBuffer())]).toEqual([99, 97, 116])
})

test('appendStoredImageAttachmentForTest should create a canvas blob for canvas content', async () => {
  class FakeOffscreenCanvas {
    public constructor(
      readonly width: number,
      readonly height: number,
    ) {}

    public getContext(type: string): { fillStyle: string; fillRect: (x: number, y: number, width: number, height: number) => void } | null {
      if (type !== '2d') {
        return null
      }
      return {
        fillRect: (): void => {},
        fillStyle: '',
      }
    }

    public async convertToBlob({ type }: { readonly type: string }): Promise<Blob> {
      return new Blob(['canvas'], { type })
    }
  }

  setOffscreenCanvas(FakeOffscreenCanvas)

  const state = createDefaultState()
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.appendEvent': () => undefined,
  })

  await AppendStoredImageAttachmentForTest.appendStoredImageAttachmentForTest(
    state,
    'session-1',
    9,
    'image/webp',
    'canvas.webp',
    'canvas',
    '',
    '2026-04-10T11:37:00.000Z',
  )

  expect(mockRpc.invocations).toHaveLength(1)
  const [command, event] = mockRpc.invocations[0] as [
    string,
    {
      readonly blob: Blob
      readonly mimeType: string
    },
  ]
  expect(command).toBe('ChatStorage.appendEvent')
  expect(event.mimeType).toBe('image/webp')
  await expect(event.blob.text()).resolves.toBe('canvas')
})

test('appendStoredImageAttachmentForTest should fail when a canvas context cannot be created', async () => {
  class FakeOffscreenCanvas {
    public constructor(
      readonly width: number,
      readonly height: number,
    ) {}

    public getContext(): null {
      return null
    }

    public async convertToBlob(): Promise<Blob> {
      return new Blob()
    }
  }

  setOffscreenCanvas(FakeOffscreenCanvas)

  const state = createDefaultState()
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.appendEvent': () => undefined,
  })

  await expect(
    AppendStoredImageAttachmentForTest.appendStoredImageAttachmentForTest(
      state,
      'session-1',
      10,
      'image/webp',
      'canvas.webp',
      'canvas',
      '',
      '2026-04-10T11:38:00.000Z',
    ),
  ).rejects.toThrow('2d canvas context is not available')
  expect(mockRpc.invocations).toEqual([])
})
