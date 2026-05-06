import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-bucket-dom'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-bucket-dom')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

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

  const bucketDivs = Locator('.ChatDebugViewTimeline div.ChatDebugViewTimelineBucket')

  // assert dom structure
  const locator2 = Locator('.ChatDebugViewTimeline label')
  await expect(locator2).toHaveCount(0)
  const locator3 = Locator('.ChatDebugViewTimeline input')
  await expect(locator3).toHaveCount(0)
  await expect(bucketDivs).toHaveCount(12)
}
