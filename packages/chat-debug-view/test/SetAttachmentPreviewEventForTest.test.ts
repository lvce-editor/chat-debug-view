import { expect, test } from '@jest/globals'
import { getSelectedEventPreview } from '../src/parts/SelectedEventPreview/SelectedEventPreview.ts'
import * as SetAttachmentPreviewEventForTest from '../src/parts/SetAttachmentPreviewEventForTest/SetAttachmentPreviewEventForTest.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('setAttachmentPreviewEventForTest should set an in-memory selected image preview event', () => {
  const result = SetAttachmentPreviewEventForTest.setAttachmentPreviewEventForTest(
    createDefaultState(),
    'session-1',
    'diagram.png',
    'image/png',
    'image',
    'data:image/png;base64,preview',
  )

  expect(result.selectedEventIndex).toBe(0)
  expect(result.selectedEvent).toBeDefined()
  expect(getSelectedEventPreview(result.selectedEvent!)).toEqual({
    alt: 'diagram.png',
    previewType: 'image',
    src: 'data:image/png;base64,preview',
  })
})
