import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-filter-reversed-range'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-reversed')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

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
  const locator2 = Locator('.ChatDebugViewTimelineBucketSelected')
  await expect(locator2).toHaveCount(8)
  await expect(rows).toHaveCount(1)
  const firstRow = rows.nth(0)
  await expect(firstRow).toContainText('response-part')
}
