import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.details-section-tag'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-details-section-tag')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      path: '/chat',
      sessionId: 'e2e-session-details-section-tag',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  const detailsSection = Locator('section.ChatDebugViewDetails')

  // assert
  await expect(detailsSection).toHaveCount(1)
  await expect(detailsSection).toBeVisible()
  await expect(Locator('div.ChatDebugViewDetails')).toHaveCount(0)
}
