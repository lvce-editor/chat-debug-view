import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-bucket-dom'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-bucket-dom')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-timeline-bucket-dom',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-bucket-dom',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.ChatDebugViewEventRow')
  const buckets = Locator('.ChatDebugViewTimelineBucket')
  const firstBucket = buckets.nth(0)

  // assert dom structure
  await expect(Locator('.ChatDebugViewTimeline label')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewTimeline input')).toHaveCount(0)
  await expect(buckets).toHaveCount(12)

  // act + assert clickable div bucket still filters events
  await firstBucket.dispatchEvent('click', '')
  await expect(Locator('.ChatDebugViewTimelineBucketSelected')).toHaveCount(1)
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('request')
}
