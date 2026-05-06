import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-double-click-reset'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  await ChatDebug.open('e2e-session-timeline-double-click-reset')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

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
  const rows = Locator('.TableBody .TableRow')

  await expect(interactiveTimeline).toBeVisible()
  await ChatDebug.setTimelineRangePreset('0:0.833')
  const locator2 = Locator('.ChatDebugViewTimelineBucketSelected')
  await expect(locator2).toHaveCount(1)
  await expect(rows).toHaveCount(1)

  await Command.execute('ChatDebug.handleTimelineDoubleClick')

  const locator3 = Locator('.ChatDebugViewTimelineBucketSelected')
  await expect(locator3).toHaveCount(0)
  await expect(rows).toHaveCount(2)
}
