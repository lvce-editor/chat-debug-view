import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.ignores-other-session-events'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-only-this')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-only-this',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
      url: 'https://example.com/match',
    },
    {
      sessionId: 'e2e-session-other',
      target: 'Should not appear',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'handle-click',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  // assert
  const rows = Locator('.ChatDebugViewEventRow')
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('request')
  await expect(rows.nth(0)).toContainText('match')
}
