import { afterEach, expect, test } from '@jest/globals'
import { createBlob } from '../src/parts/CreateBlob/CreateBlob.ts'

const originalOffscreenCanvas = globalThis.OffscreenCanvas

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

test('createBlob should create a text blob for text content', async () => {
  const blob = await createBlob('image/svg+xml', 'text', '<svg></svg>')

  expect(blob.type).toBe('image/svg+xml')
  await expect(blob.text()).resolves.toBe('<svg></svg>')
})

test('createBlob should decode base64 content into a blob', async () => {
  const blob = await createBlob('image/png', 'base64', btoa('cat'))

  expect([...new Uint8Array(await blob.arrayBuffer())]).toEqual([99, 97, 116])
})

test('createBlob should delegate canvas content to the canvas blob creator', async () => {
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

  const blob = await createBlob('image/webp', 'canvas', '')

  expect(blob.type).toBe('image/webp')
  await expect(blob.text()).resolves.toBe('canvas')
})
