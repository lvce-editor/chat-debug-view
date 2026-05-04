import { expect, test } from '@jest/globals'
import { handlePreviewTextScrollBarPointerDown } from '../src/parts/HandlePreviewTextScrollBarPointerDown/HandlePreviewTextScrollBarPointerDown.ts'
import { setSelectedEventPreview } from '../src/parts/SelectedEventPreview/SelectedEventPreview.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handlePreviewTextScrollBarPointerDown should update preview scroll state', () => {
  const state = {
    ...createDefaultState(),
    height: 600,
    selectedEvent: setSelectedEventPreview(
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-05-04T10:00:00.000Z',
        type: 'request',
      },
      Array.from({ length: 40 }, (_, index) => `line ${index + 1}`).join('\n'),
    ),
    useDevtoolsLayout: true,
    width: 900,
    x: 10,
    y: 20,
  }

  const result = handlePreviewTextScrollBarPointerDown(state, 380)

  expect(result.previewTextDeltaY).toBe(192)
  expect(result.previewTextScrollBarHandleOffset).toBe(90)
  expect(result.previewTextScrollBarPointerActive).toBe(true)
})
