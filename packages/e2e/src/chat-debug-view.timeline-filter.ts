import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-filter'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-filter')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-timeline-filter',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-filter',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // assert timeline visible before filtering
  const rows = Locator('.TableBody .TableRow')
  const locator2 = Locator('.ChatDebugViewTimeline')
  await expect(locator2).toBeVisible()
  await expect(rows).toHaveCount(2)

  // act + assert narrowed timeline range
  await ChatDebug.setTimelineRangePreset('0:0.833')
  const locator3 = Locator('.ChatDebugViewTimelineBucketSelected')
  await expect(locator3).toHaveCount(1)
  await expect(rows).toHaveCount(1)
  const rowsNth0 = rows.nth(0)
  await expect(rowsNth0).toContainText('request')
}
