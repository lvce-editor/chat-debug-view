import { afterEach, expect, jest, test } from '@jest/globals'
import { readBlobAsPreviewUrl } from '../src/parts/ReadBlobAsPreviewUrl/ReadBlobAsPreviewUrl.ts'

const originalCreateObjectUrl = URL.createObjectURL

afterEach(() => {
  jest.restoreAllMocks()
  Reflect.deleteProperty(globalThis, 'FileReaderSync')
  if (originalCreateObjectUrl) {
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: originalCreateObjectUrl,
      writable: true,
    })
  } else {
    Reflect.deleteProperty(URL, 'createObjectURL')
  }
})

test('readBlobAsPreviewUrl should prefer FileReaderSync when available', () => {
  Object.assign(globalThis, {
    FileReaderSync: class {
      readAsDataURL(): string {
        return 'data:image/png;base64,preview'
      }
    },
  })

  expect(readBlobAsPreviewUrl(new Blob(['image']))).toBe('data:image/png;base64,preview')
})

test('readBlobAsPreviewUrl should fall back to URL.createObjectURL', () => {
  Object.defineProperty(URL, 'createObjectURL', {
    configurable: true,
    value: jest.fn(() => 'blob:preview'),
    writable: true,
  })

  expect(readBlobAsPreviewUrl(new Blob(['image']))).toBe('blob:preview')
})

test('readBlobAsPreviewUrl should throw when no preview reader is available', () => {
  Reflect.deleteProperty(URL, 'createObjectURL')

  expect(() => readBlobAsPreviewUrl(new Blob(['image']))).toThrow(new Error('image preview reader is not available'))
})
