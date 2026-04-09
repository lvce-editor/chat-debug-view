import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-drag-select'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-drag-select')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-timeline-drag-select',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-drag-select',
      timestamp: '2026-03-08T00:00:05.000Z',
      type: 'response',
    },
    {
      sessionId: 'e2e-session-timeline-drag-select',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'event-stream-finished',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.ChatDebugViewEventRow')
  const interactiveTimeline = Locator('.ChatDebugViewTimelineInteractive')

  // assert
  await expect(interactiveTimeline).toBeVisible()
  await expect(rows).toHaveCount(3)
  await expect(Locator('.ChatDebugViewTimelineSelectionMarker')).toHaveCount(0)

  // act
  await Command.execute('ChatDebug.handleTimelinePointerDown', 140, 100, 400)
  await Command.execute('ChatDebug.handleTimelinePointerMove', 300)
  await Command.execute('ChatDebug.handleTimelinePointerUp', 300)

  // assert
  await expect(Locator('.ChatDebugViewTimelineSelectionRange')).toBeVisible()
  await expect(Locator('.ChatDebugViewTimelineSelectionMarker')).toHaveCount(2)
  await expect(rows).toHaveCount(2)
  await expect(rows.nth(0)).toContainText('request')
  await expect(rows.nth(1)).toContainText('response')

  // act
  await interactiveTimeline.dispatchEvent('dblclick', '')

  // assert
  await expect(Locator('.ChatDebugViewTimelineSelectionMarker')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewTimelineSelectionRange')).toHaveCount(0)
  await expect(rows).toHaveCount(3)
}
