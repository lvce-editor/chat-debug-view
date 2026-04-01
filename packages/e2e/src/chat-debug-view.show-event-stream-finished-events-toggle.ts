import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.show-event-stream-finished-events-toggle'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-show-event-stream-finished')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-show-event-stream-finished',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-show-event-stream-finished',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'event-stream-finished',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  // assert default hidden
  const rows = Locator('.ChatDebugViewEventRow')
  await expect(rows).toHaveCount(1)

  // act + assert visible when enabled
  await Command.execute('ChatDebug.handleInput', 'showEventStreamFinishedEvents', '', true)
  await expect(rows).toHaveCount(2)
  await expect(rows.nth(1)).toContainText('event-stream-finished')
}
