import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-badges'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-badges')
  await expect(Locator('.ChatDebugView')).toBeVisible()

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
  await expect(Locator('.ChatDebugViewTimeline')).toBeVisible()
  await expect(badges).toHaveCount(6)
  await expect(badges.nth(0)).toHaveText('0s')
  await expect(badges.nth(1)).toHaveText('2s')
  await expect(badges.nth(2)).toHaveText('4s')
  await expect(badges.nth(3)).toHaveText('6s')
  await expect(badges.nth(4)).toHaveText('8s')
  await expect(badges.nth(5)).toHaveText('10s')
}
