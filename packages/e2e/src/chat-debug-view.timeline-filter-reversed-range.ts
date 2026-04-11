import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-filter-reversed-range'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-reversed')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-timeline-reversed',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-reversed',
      timestamp: '2026-03-08T00:00:05.000Z',
      type: 'response-part',
    },
    {
      sessionId: 'e2e-session-timeline-reversed',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // act
  await ChatDebug.setTimelineRangePreset('8:2')

  // assert
  const rows = Locator('.TableBody .TableRow')
  await expect(Locator('.ChatDebugViewTimelineBucketSelected')).toHaveCount(8)
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('response-part')
}
