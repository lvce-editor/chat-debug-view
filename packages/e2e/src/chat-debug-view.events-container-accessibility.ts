import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.events-container-accessibility'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-events-container-accessibility')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      path: '/chat',
      sessionId: 'e2e-session-events-container-accessibility',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const eventsContainer = Locator('.ChatDebugViewEvents')

  // assert
  await expect(eventsContainer).toBeVisible()
  await expect(eventsContainer).toHaveAttribute('role', 'application')
  await expect(eventsContainer).not.toHaveAttribute('tabindex', '0')
}
