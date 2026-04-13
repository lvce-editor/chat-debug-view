import { expect, test } from '@jest/globals'
import { handlePreviewTextPointerDown } from '../src/parts/HandlePreviewTextPointerDown/HandlePreviewTextPointerDown.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handlePreviewTextPointerDown should update the preview cursor for numbered text previews', () => {
  const state = {
    ...createDefaultState(),
    selectedEvent: {
      arguments: {
        uri: 'file:///workspace/example.txt',
      },
      eventId: 1,
      name: 'read_file',
      result: 'first line\nsecond line',
      sessionId: 'session-1',
      timestamp: '2026-04-13T10:00:00.000Z',
      type: 'tool-execution',
    },
  }

  const result = handlePreviewTextPointerDown(state, 28, 21)

  expect(result.previewTextCursorColumnIndex).toBe(3)
  expect(result.previewTextCursorRowIndex).toBe(1)
})

test('handlePreviewTextPointerDown should ignore preview text without line numbers', () => {
  const state = {
    ...createDefaultState(),
    selectedEvent: {
      eventId: 1,
      sessionId: 'session-1',
      text: 'first line\nsecond line',
      timestamp: '2026-04-13T10:00:00.000Z',
      type: 'chat-message-updated',
    },
  }

  const result = handlePreviewTextPointerDown(state, 28, 21)

  expect(result).toBe(state)
})
