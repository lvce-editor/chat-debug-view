import { expect, test } from '@jest/globals'
import { getImageStats } from '../src/parts/GetImageStats/GetImageStats.ts'

test('getImageStats should use SVG dimension parsing for svg images', async () => {
  const blob = new Blob(['<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18"></svg>'], {
    type: 'image/svg+xml',
  })

  await expect(getImageStats(blob, 'image/svg+xml')).resolves.toBe(`24 × 18 px · ${blob.size} B`)
})

test('getImageStats should reject svg images without measurable dimensions', async () => {
  const blob = new Blob(['<svg xmlns="http://www.w3.org/2000/svg"></svg>'], {
    type: 'image/svg+xml',
  })

  await expect(getImageStats(blob, 'image/svg+xml')).rejects.toThrow(new TypeError('image stats are not available'))
})
