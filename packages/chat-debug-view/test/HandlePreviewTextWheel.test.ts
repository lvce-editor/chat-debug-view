import { expect, test } from '@jest/globals'
import { handlePreviewTextWheel } from '../src/parts/HandlePreviewTextWheel/HandlePreviewTextWheel.ts'
import { setSelectedEventPreview } from '../src/parts/SelectedEventPreview/SelectedEventPreview.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

const createPreviewState = (): ReturnType<typeof createDefaultState> => {
  return {
    ...createDefaultState(),
    height: 600,
    selectedEvent: setSelectedEventPreview(
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-05-04T10:00:00.000Z',
        subType: 'request',
        type: 'request',
      },
      Array.from({ length: 40 }, (_, index) => `line ${index + 1}`).join('\n'),
    ),
    useDevtoolsLayout: true,
    width: 900,
    x: 10,
    y: 20,
  }
}

test('handlePreviewTextWheel should increase the preview delta', () => {
  const state = createPreviewState()

  const result = handlePreviewTextWheel(state, 48)

  expect(result.previewTextDeltaY).toBe(48)
})

test('handlePreviewTextWheel should clamp negative scrolling at zero', () => {
  const state = {
    ...createPreviewState(),
    previewTextDeltaY: 24,
  }

  const result = handlePreviewTextWheel(state, -96)

  expect(result.previewTextDeltaY).toBe(0)
})
