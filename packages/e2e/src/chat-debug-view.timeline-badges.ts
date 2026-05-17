import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-badges'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-badges')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-timeline-badges',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-badges',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const badges = Locator('.ChatDebugViewTimelineBadge')

  // assert
  const locator2 = Locator('.ChatDebugViewTimeline')
  await expect(locator2).toBeVisible()
  await expect(badges).toHaveCount(6)
  const badge0 = badges.nth(0)
  await expect(badge0).toHaveText('0ms')
  const badge1 = badges.nth(1)
  await expect(badge1).toHaveText('2000ms')
  const badge2 = badges.nth(2)
  await expect(badge2).toHaveText('4000ms')
  const badge3 = badges.nth(3)
  await expect(badge3).toHaveText('6000ms')
  const badge4 = badges.nth(4)
  await expect(badge4).toHaveText('8000ms')
  const badge5 = badges.nth(5)
  await expect(badge5).toHaveText('10000ms')
}
