import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-double-click-reset'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  await ChatDebug.open('e2e-session-timeline-double-click-reset')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-timeline-double-click-reset',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-double-click-reset',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const interactiveTimeline = Locator('.ChatDebugViewTimelineInteractive')
  const rows = Locator('.ChatDebugViewEventRow')

  await expect(interactiveTimeline).toBeVisible()
  await ChatDebug.setTimelineRangePreset('0:0.833')
  await expect(Locator('.ChatDebugViewTimelineBucketSelected')).toHaveCount(1)
  await expect(rows).toHaveCount(1)

  await interactiveTimeline.click()
  await interactiveTimeline.click()

  await expect(Locator('.ChatDebugViewTimelineBucketSelected')).toHaveCount(0)
  await expect(rows).toHaveCount(2)
}
