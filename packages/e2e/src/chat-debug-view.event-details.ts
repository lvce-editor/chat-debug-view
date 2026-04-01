import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.event-details'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-event-details')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      path: '/chat',
      sessionId: 'e2e-session-event-details',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)
  await Command.execute('ChatDebug.handleEventRowClick', '0')

  // assert
  await expect(Locator('.ChatDebugViewEventRowSelected')).toHaveCount(1)
  await expect(Locator('.ChatDebugViewDetails')).toBeVisible()
  await expect(Locator('.ChatDebugViewDetailsTitle')).toContainText('Details')
  await expect(Locator('.ChatDebugViewEvent')).toContainText('"path": "/chat"')
}
