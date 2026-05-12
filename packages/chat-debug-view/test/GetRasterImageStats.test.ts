import { afterEach, expect, jest, test } from '@jest/globals'
import { getRasterImageStats } from '../src/parts/GetRasterImageStats/GetRasterImageStats.ts'

afterEach(() => {
  jest.restoreAllMocks()
  Reflect.deleteProperty(globalThis, 'createImageBitmap')
})

test('getRasterImageStats should decode the bitmap and close it', async () => {
  const close = jest.fn()
  Object.assign(globalThis, {
    createImageBitmap: jest.fn(async () => {
      return {
        close,
        height: 18,
        width: 24,
      }
    }),
  })
  const blob = new Blob(['image'], {
    type: 'image/png',
  })

  await expect(getRasterImageStats(blob)).resolves.toBe(`24 × 18 px · ${blob.size} B`)
  expect(close).toHaveBeenCalledTimes(1)
})

test('getRasterImageStats should throw when createImageBitmap is unavailable', async () => {
  await expect(getRasterImageStats(new Blob(['image']))).rejects.toThrow(new TypeError('image bitmap decoder is not available'))
})
