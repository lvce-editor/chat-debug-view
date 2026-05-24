import { expect, test } from '@jest/globals'
import { getPreviewVirtualizationState } from '../src/parts/PreviewVirtualization/PreviewVirtualization.ts'
import { setSelectedEventPreview } from '../src/parts/SelectedEventPreview/SelectedEventPreview.ts'

test('getPreviewVirtualizationState should clamp the visible line range for preview text', () => {
  const selectedEvent = setSelectedEventPreview(
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-05-04T10:00:00.000Z',
      subType: 'request',
      type: 'request',
    },
    Array.from({ length: 40 }, (_, index) => `line ${index + 1}`).join('\n'),
  )

  const result = getPreviewVirtualizationState(selectedEvent, 100, 65)

  expect(result.deltaY).toBe(65)
  expect(result.startLineY).toBe(3)
  expect(result.endLineY).toBe(8)
  expect(result.maxDeltaY).toBe(700)
  expect(result.showScrollBar).toBe(true)
})

test('getPreviewVirtualizationState should collapse to an empty viewport when preview text is not available', () => {
  const result = getPreviewVirtualizationState(null, 100, 65)

  expect(result.deltaY).toBe(0)
  expect(result.startLineY).toBe(0)
  expect(result.endLineY).toBe(0)
  expect(result.totalLineCount).toBe(0)
  expect(result.showScrollBar).toBe(false)
})
