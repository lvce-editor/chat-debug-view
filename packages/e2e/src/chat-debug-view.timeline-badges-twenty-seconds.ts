import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-badges-twenty-seconds'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-timeline-badges-twenty-seconds'

  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

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

  const locator2 = Locator('.ChatDebugViewTimeline')
  await expect(locator2).toBeVisible()
  await expect(badges).toHaveCount(6)
  const badge5 = badges.nth(5)
  await expect(badge5).toHaveText('20000ms')
}
