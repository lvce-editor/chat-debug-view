import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-badges-large-values'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-timeline-badges-large-values'
  const baseTime = Date.parse('2026-03-08T00:00:00.000Z')

  // arrange
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = Array.from({ length: 23 }, (_, index) => ({
    sessionId,
    timestamp: new Date(baseTime + index * 2000).toISOString(),
    type: index === 0 ? 'request' : 'response-part',
  }))
  events[22] = {
    ...events[22],
    type: 'response',
  }

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
  await expect(badge1).toHaveText('8800ms')
  const badge2 = badges.nth(2)
  await expect(badge2).toHaveText('17600ms')
  const badge3 = badges.nth(3)
  await expect(badge3).toHaveText('26400ms')
  const badge4 = badges.nth(4)
  await expect(badge4).toHaveText('35200ms')
  const badge5 = badges.nth(5)
  await expect(badge5).toHaveText('44000ms')
}
