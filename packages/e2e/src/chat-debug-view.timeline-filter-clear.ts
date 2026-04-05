import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-filter-clear'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-clear')
  await expect(Locator('.ChatDebugView')).toBeVisible()

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
  await expect(Locator('.ChatDebugViewEventRow')).toHaveCount(1)
  await ChatDebug.setTimelineRangePreset('')

  // assert
  await expect(Locator('.ChatDebugViewTimelineBucketSelected')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewEventRow')).toHaveCount(2)
}
