import { expect, test } from '@jest/globals'
import { getSvgImageStats } from '../src/parts/GetSvgImageStats/GetSvgImageStats.ts'

test('getSvgImageStats should read width and height attributes', async () => {
  const blob = new Blob(['<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18"></svg>'], {
    type: 'image/svg+xml',
  })

  await expect(getSvgImageStats(blob)).resolves.toBe(`24 × 18 px · ${blob.size} B`)
})

test('getSvgImageStats should fall back to the viewBox when width and height are absent', async () => {
  const blob = new Blob(['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36"></svg>'], {
    type: 'image/svg+xml',
  })

  await expect(getSvgImageStats(blob)).resolves.toBe(`48 × 36 px · ${blob.size} B`)
})

test('getSvgImageStats should return undefined when dimensions are unavailable', async () => {
  const blob = new Blob(['<svg xmlns="http://www.w3.org/2000/svg"></svg>'], {
    type: 'image/svg+xml',
  })

  await expect(getSvgImageStats(blob)).resolves.toBeUndefined()
})
