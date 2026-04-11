import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-badges-twenty-seconds'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-timeline-badges-twenty-seconds'

  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await ChatDebug.setEvents([
    {
      sessionId,
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId,
      timestamp: '2026-03-08T00:00:20.000Z',
      type: 'response',
    },
  ])
  await ChatDebug.useDevtoolsLayout()

  const badges = Locator('.ChatDebugViewTimelineBadge')

  await expect(Locator('.ChatDebugViewTimeline')).toBeVisible()
  await expect(badges).toHaveCount(6)
  await expect(badges.nth(5)).toHaveText('20000ms')
}