import { expect, test } from '@jest/globals'
import { getAttachmentImagePreviewMimeType } from '../src/parts/GetAttachmentImagePreviewMimeType/GetAttachmentImagePreviewMimeType.ts'

test('getAttachmentImagePreviewMimeType should return the mime type when it is a string', () => {
  expect(
    getAttachmentImagePreviewMimeType({
      eventId: 1,
      mimeType: 'image/png',
      subType: 'chat-attachment-added',
      type: 'chat-attachment-added',
    }),
  ).toBe('image/png')
})

test('getAttachmentImagePreviewMimeType should return undefined for non-string mime types', () => {
  expect(
    getAttachmentImagePreviewMimeType({
      eventId: 1,
      mimeType: 42,
      subType: 'chat-attachment-added',
      type: 'chat-attachment-added',
    }),
  ).toBeUndefined()
})
