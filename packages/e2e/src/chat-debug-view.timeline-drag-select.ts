import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-drag-select'

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
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableBody .TableRow')
  const interactiveTimeline = Locator('.ChatDebugViewTimelineInteractive')

  // assert
  await expect(interactiveTimeline).toBeVisible()
  await expect(rows).toHaveCount(3)
  await expect(Locator('.ChatDebugViewTimelineSelectionMarker')).toHaveCount(0)

  // act
  await Command.execute('ChatDebug.handleTimelinePointerDown', '', 0, 30)
  await Command.execute('ChatDebug.handleTimelinePointerMove', 30)
  await Command.execute('ChatDebug.handleTimelinePointerUp', 30)

  // assert
  await expect(Locator('.ChatDebugViewTimelineSelectionRange')).toBeVisible()
  await expect(Locator('.ChatDebugViewTimelineSelectionMarker')).toHaveCount(2)
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('request')
}
