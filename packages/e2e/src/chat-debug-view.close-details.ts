import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.close-details'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-close-details')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      path: '/chat',
      sessionId: 'e2e-session-close-details',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  const closeButton = Locator('.ChatDebugViewDetailsClose')

  await expect(closeButton).toHaveAttribute('aria-label', 'Close details')
  await Command.execute('ChatDebug.handleCloseDetails')

  // assert
  await expect(Locator('.ChatDebugViewDetails')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewEventRowSelected')).toHaveCount(0)
}
