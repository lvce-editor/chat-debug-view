import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-badges-large-values'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-timeline-badges-large-values'
  const baseTime = Date.parse('2026-03-08T00:00:00.000Z')

  // arrange
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = Array.from({ length: 23 }, (_, index) => ({
    sessionId,
    timestamp: new Date(baseTime + index * 2000).toISOString(),
    type: index === 0 ? 'request' : index === 22 ? 'response' : 'response-part',
  }))

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const badges = Locator('.ChatDebugViewTimelineBadge')

  // assert
  await expect(Locator('.ChatDebugViewTimeline')).toBeVisible()
  await expect(badges).toHaveCount(6)
  await expect(badges.nth(0)).toHaveText('0ms')
  await expect(badges.nth(1)).toHaveText('8800ms')
  await expect(badges.nth(2)).toHaveText('17600ms')
  await expect(badges.nth(3)).toHaveText('26400ms')
  await expect(badges.nth(4)).toHaveText('35200ms')
  await expect(badges.nth(5)).toHaveText('44000ms')
}
