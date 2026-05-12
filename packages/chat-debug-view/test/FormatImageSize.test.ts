import { expect, test } from '@jest/globals'
import { formatImageSize } from '../src/parts/FormatImageSize/FormatImageSize.ts'

test('formatImageSize should format byte sizes below one kilobyte', () => {
  expect(formatImageSize(512)).toBe('512 B')
})

test('formatImageSize should format kilobyte sizes with one decimal place', () => {
  expect(formatImageSize(1536)).toBe('1.5 kB')
})
