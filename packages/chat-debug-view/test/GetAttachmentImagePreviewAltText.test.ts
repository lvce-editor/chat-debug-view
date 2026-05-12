import { expect, test } from '@jest/globals'
import { getAttachmentImagePreviewAltText } from '../src/parts/GetAttachmentImagePreviewAltText/GetAttachmentImagePreviewAltText.ts'

test('getAttachmentImagePreviewAltText should return the attachment name', () => {
  expect(
    getAttachmentImagePreviewAltText({
      eventId: 1,
      name: 'photo.png',
      type: 'chat-attachment-added',
    }),
  ).toBe('photo.png')
})

test('getAttachmentImagePreviewAltText should fall back when the attachment name is missing', () => {
  expect(
    getAttachmentImagePreviewAltText({
      eventId: 1,
      type: 'chat-attachment-added',
    }),
  ).toBe('image preview')
})
