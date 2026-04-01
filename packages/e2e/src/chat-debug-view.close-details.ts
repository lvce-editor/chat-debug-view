import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.close-details'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-close-details')
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
  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)
  await Command.execute('ChatDebug.handleEventRowClick', '0')

  const closeButton = Locator('.ChatDebugViewDetailsClose')

  await expect(closeButton).toHaveAttribute('aria-label', 'Close details')
  await closeButton.click()

  // assert
  await expect(Locator('.ChatDebugViewDetails')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewEventRowSelected')).toHaveCount(0)
}
