import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.empty-filter-results'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-empty-filter-results')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-empty-filter-results',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
      url: 'https://example.com/alpha',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)
  await Command.execute('ChatDebug.handleInput', 'filter', 'missing', false)

  // assert
  await expect(Locator('.ChatDebugViewEmpty')).toBeVisible()
  await expect(Locator('.ChatDebugViewEventCount')).toContainText('no events found matching missing')
}
