import { afterEach, expect, test } from '@jest/globals'
import { createCanvasBlob } from '../src/parts/CreateCanvasBlob/CreateCanvasBlob.ts'

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

test('createCanvasBlob should create a blob from an offscreen canvas', async () => {
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

  const blob = await createCanvasBlob('image/webp')

  expect(blob.type).toBe('image/webp')
  await expect(blob.text()).resolves.toBe('canvas')
})

test('createCanvasBlob should fail when a canvas context cannot be created', async () => {
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

  await expect(createCanvasBlob('image/webp')).rejects.toThrow('2d canvas context is not available')
})
