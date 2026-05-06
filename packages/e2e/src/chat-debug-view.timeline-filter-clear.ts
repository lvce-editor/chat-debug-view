import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-filter-clear'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-clear')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-timeline-clear',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-clear',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // act
  await ChatDebug.setTimelineRangePreset('0:0.833')
  const locator2 = Locator('.TableBody .TableRow')
  await expect(locator2).toHaveCount(1)
  await ChatDebug.setTimelineRangePreset('')

  // assert
  const locator3 = Locator('.ChatDebugViewTimelineBucketSelected')
  await expect(locator3).toHaveCount(0)
  const locator4 = Locator('.TableBody .TableRow')
  await expect(locator4).toHaveCount(2)
}
