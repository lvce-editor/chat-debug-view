import { afterEach, expect, jest, test } from '@jest/globals'
import { getAttachmentImagePreview } from '../src/parts/GetAttachmentImagePreview/GetAttachmentImagePreview.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('getAttachmentImagePreview should return an image preview for image attachments', async () => {
  const createImageBitmapMock = jest.fn(async (_blob: Blob) => {
    return {
      close(): void {},
    }
  })
  const fileReaderSyncMock = jest.fn(() => {
    return {
      readAsDataURL(): string {
        return 'data:image/png;base64,preview'
      },
    }
  })
  Object.assign(globalThis, {
    createImageBitmap: createImageBitmapMock,
    FileReaderSync: fileReaderSyncMock,
  })
  const event = {
    blob: new Blob(['png'], {
      type: 'image/png',
    }),
    eventId: 1,
    mimeType: 'image/png',
    name: 'diagram.png',
    type: 'chat-attachment-added',
  }

  const result = await getAttachmentImagePreview(event)

  expect(result).toEqual({
    alt: 'diagram.png',
    previewType: 'image',
    src: 'data:image/png;base64,preview',
  })
  expect(createImageBitmapMock).toHaveBeenCalledTimes(1)
})

test.each([
  ['image/jpeg', 'photo.jpg'],
  ['image/avif', 'photo.avif'],
  ['image/svg+xml', 'photo.svg'],
])('getAttachmentImagePreview should accept %s attachments', async (mimeType, name) => {
  Object.assign(globalThis, {
    createImageBitmap: jest.fn(async (_blob: Blob) => {
      return {
        close(): void {},
      }
    }),
    FileReaderSync: class {
      readAsDataURL(): string {
        return `data:${mimeType};base64,preview`
      }
    },
  })
  const event = {
    blob: new Blob(['image'], {
      type: mimeType,
    }),
    eventId: 1,
    mimeType,
    name,
    type: 'chat-attachment-added',
  }

  const result = await getAttachmentImagePreview(event)

  expect(result).toEqual({
    alt: name,
    previewType: 'image',
    src: `data:${mimeType};base64,preview`,
  })
})

test('getAttachmentImagePreview should return an SVG preview without bitmap validation', async () => {
  const createImageBitmapMock = jest.fn(async () => {
    throw new Error('svg bitmap validation is unavailable')
  })
  Object.assign(globalThis, {
    createImageBitmap: createImageBitmapMock,
    FileReaderSync: class {
      readAsDataURL(): string {
        return 'data:image/svg+xml;base64,preview'
      }
    },
  })
  const event = {
    blob: new Blob(['<svg xmlns="http://www.w3.org/2000/svg"></svg>'], {
      type: 'image/svg+xml',
    }),
    eventId: 1,
    mimeType: 'image/svg+xml',
    name: 'photo.svg',
    type: 'chat-attachment-added',
  }

  const result = await getAttachmentImagePreview(event)

  expect(result).toEqual({
    alt: 'photo.svg',
    previewType: 'image',
    src: 'data:image/svg+xml;base64,preview',
  })
  expect(createImageBitmapMock).not.toHaveBeenCalled()
})

test('getAttachmentImagePreview should return a fallback message when image validation fails', async () => {
  Object.assign(globalThis, {
    createImageBitmap: jest.fn(async () => {
      throw new Error('decode failed')
    }),
  })
  const event = {
    blob: new Blob(['bad'], {
      type: 'image/png',
    }),
    eventId: 1,
    mimeType: 'image/png',
    name: 'broken.png',
    type: 'chat-attachment-added',
  }

  const result = await getAttachmentImagePreview(event)

  expect(result).toBe('image could not be loaded')
})

test('getAttachmentImagePreview should ignore non-image attachments', async () => {
  const event = {
    blob: new Blob(['text'], {
      type: 'text/plain',
    }),
    eventId: 1,
    mimeType: 'text/plain',
    name: 'notes.txt',
    type: 'chat-attachment-added',
  }

  const result = await getAttachmentImagePreview(event)

  expect(result).toBeUndefined()
})
