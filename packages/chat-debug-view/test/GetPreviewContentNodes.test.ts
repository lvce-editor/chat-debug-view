import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getPreviewContentNodes } from '../src/parts/GetPreviewContentNodes/GetPreviewContentNodes.ts'
import { getPreviewEvent } from '../src/parts/GetPreviewEvent/GetPreviewEvent.ts'
import { getPreviewEventNodes } from '../src/parts/GetPreviewEventNodes/GetPreviewEventNodes.ts'

test('getPreviewContentNodes should return existing preview nodes when available', () => {
  const previewEventNodes = [
    {
      childCount: 0,
      className: 'PreviewNode',
      type: VirtualDomElements.Div,
    },
  ]

  const result = getPreviewContentNodes(previewEventNodes, null, null, null)

  expect(result).toBe(previewEventNodes)
})

test('getPreviewContentNodes should return an empty array when there is no selected event', () => {
  const result = getPreviewContentNodes([], null, null, null)

  expect(result).toEqual([])
})

test('getPreviewContentNodes should derive preview nodes from the selected event', () => {
  const selectedEvent = {
    eventId: 3,
    message: {
      id: 'message-1',
      role: 'user',
      text: 'preview text',
      time: '02:05 PM',
    },
    sessionId: 'session-1',
    timestamp: '2026-04-09T12:05:40.910Z',
    type: 'chat-message-added',
  }

  const result = getPreviewContentNodes([], selectedEvent, 2, 4)

  expect(result).toEqual(
    getPreviewEventNodes(getPreviewEvent(selectedEvent), selectedEvent, {
      columnIndex: 4,
      rowIndex: 2,
    }),
  )
})
