import { expect, test } from '@jest/globals'
import { getAttachmentImagePreviewBlob } from '../src/parts/GetAttachmentImagePreviewBlob/GetAttachmentImagePreviewBlob.ts'

test('getAttachmentImagePreviewBlob should return the blob for valid blob-backed events', () => {
  const blob = new Blob(['image'], {
    type: 'image/png',
  })

  expect(
    getAttachmentImagePreviewBlob({
      blob,
      eventId: 1,
      type: 'chat-attachment-added',
    }),
  ).toBe(blob)
})

test('getAttachmentImagePreviewBlob should return undefined for invalid blob values', () => {
  expect(
    getAttachmentImagePreviewBlob({
      blob: 'not-a-blob',
      eventId: 1,
      type: 'chat-attachment-added',
    }),
  ).toBeUndefined()
})
