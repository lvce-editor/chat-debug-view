import { expect, test } from '@jest/globals'
import { isImageMimeType } from '../src/parts/IsImageMimeType/IsImageMimeType.ts'

test('isImageMimeType should return true for image mime types', () => {
  expect(isImageMimeType('image/png')).toBe(true)
})

test('isImageMimeType should return false for non-image mime types', () => {
  expect(isImageMimeType('text/plain')).toBe(false)
  expect(isImageMimeType(undefined)).toBe(false)
})
